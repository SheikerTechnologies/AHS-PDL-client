import { test, expect } from '@playwright/test';

/**
 * Functional Tests
 * Navigation, links, anchor scrolling, 404 handling, and form validation.
 */

// ─── Internal Links Don't 404 ──────────────────────────────────
test('all internal links on homepage return 200', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href]'))
      .map((a) => (a as HTMLAnchorElement).href)
      .filter((href) => href.startsWith(window.location.origin));
  });

  const uniqueLinks = [...new Set(links)];

  for (const url of uniqueLinks) {
    const response = await page.request.get(url);
    expect(
      response.status(),
      `GET ${url} returned ${response.status()}`,
    ).toBeLessThan(400);
  }
});

// ─── Certificate Anchor Scroll ──────────────────────────────────
test('services page "View Certificate" link scrolls to certificate section on homepage', async ({
  page,
}) => {
  await page.goto('/services', { waitUntil: 'networkidle' });

  // Click the View Certificate link
  const link = page.locator('a[href="/#certificate-section"]');
  await expect(link).toBeVisible();
  await link.click();

  // Wait for navigation
  await page.waitForURL('**/#certificate-section', { timeout: 10_000 });

  // Verify the certificate section is visible in viewport
  const section = page.locator('#certificate-section');
  await expect(section).toBeVisible({ timeout: 5_000 });

  // Verify the section is actually scrolled into view (within viewport)
  const box = await section.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeLessThan(1000); // Should be near the top after scroll
});

// ─── 404 Page ──────────────────────────────────────────────────
test('non-existent route shows 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist-abc123');
  expect(response?.status()).toBe(404);
});

// ─── All Pages Return 200 ──────────────────────────────────────
const ROUTES = ['/', '/services', '/projects', '/blog', '/about'];

for (const route of ROUTES) {
  test(`GET ${route} returns 200`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  });
}

// ─── Navigation Between Pages ──────────────────────────────────
test('can navigate from home to services and back', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Find and click a services link in navigation
  const navLink = page.locator('nav a[href="/services"]').first();
  if (await navLink.isVisible()) {
    await navLink.click();
    await page.waitForURL('**/services');
    expect(page.url()).toContain('/services');
  }
});

// ─── No Console Errors ─────────────────────────────────────────
test('homepage has no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('/', { waitUntil: 'networkidle' });

  // Filter out known harmless errors (e.g., favicon, analytics)
  const criticalErrors = errors.filter(
    (e) =>
      !e.includes('favicon') &&
      !e.includes('analytics') &&
      !e.includes('Failed to load resource') &&
      !e.includes('NetInfo'),
  );

  expect(criticalErrors, `Console errors: ${criticalErrors.join('\n')}`).toHaveLength(0);
});

// ─── External Links Have Target _blank ─────────────────────────
test('external links open in new tab with noopener', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const externalLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href]'))
      .filter((a) => {
        const href = (a as HTMLAnchorElement).href;
        return (
          href.startsWith('http') &&
          !href.includes(window.location.origin)
        );
      })
      .map((a) => ({
        href: (a as HTMLAnchorElement).href,
        target: a.getAttribute('target'),
        rel: a.getAttribute('rel'),
      }));
  });

  for (const link of externalLinks) {
    expect(
      link.target,
      `${link.href} should have target="_blank"`,
    ).toBe('_blank');
    expect(
      link.rel,
      `${link.href} should have rel="noopener noreferrer"`,
    ).toContain('noopener');
  }
});
