import { test, expect } from '@playwright/test';

/**
 * Security Tests
 * Checks for security headers, meta tags, and common vulnerabilities.
 */

// ─── Security Headers ──────────────────────────────────────────
test('homepage returns security headers', async ({ page }) => {
  const response = await page.goto('/');
  const headers = response?.headers() || {};

  // X-Content-Type-Options
  expect(
    headers['x-content-type-options'],
    'Missing X-Content-Type-Options header',
  ).toBe('nosniff');

  // X-Frame-Options
  expect(
    headers['x-frame-options'],
    'Missing X-Frame-Options header',
  ).toBeDefined();
});

// ─── No Sensitive Data in HTML ─────────────────────────────────
test('homepage HTML does not contain exposed API keys or secrets', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const html = await page.content();

  // Check for common secret patterns
  const secretPatterns = [
    /api[_-]?key\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/i,
    /secret\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/i,
    /password\s*[:=]\s*['"][^'"]{8,}['"]/i,
    /token\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/i,
    /PRIVATE[_\s]KEY/i,
  ];

  for (const pattern of secretPatterns) {
    const match = html.match(pattern);
    expect(
      match,
      `Potential secret found in HTML: ${match?.[0]?.substring(0, 50)}...`,
    ).toBeNull();
  }
});

// ─── No Inline Scripts with User Input ─────────────────────────
test('no dangerouslySetInnerHTML with dynamic content', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Check for inline event handlers (potential XSS vector)
  const inlineHandlers = await page.evaluate(() => {
    const elements = document.querySelectorAll('[onclick], [onerror], [onload]');
    return Array.from(elements).map((el) => ({
      tag: el.tagName,
      handler: el.getAttribute('onclick') || el.getAttribute('onerror') || el.getAttribute('onload'),
    }));
  });

  expect(
    inlineHandlers,
    `Inline event handlers found: ${JSON.stringify(inlineHandlers)}`,
  ).toHaveLength(0);
});

// ─── Robots.txt Present ────────────────────────────────────────
test('robots.txt exists and is accessible', async ({ page }) => {
  const response = await page.goto('/robots.txt');
  expect(response?.status()).toBe(200);

  const content = await page.textContent('body');
  expect(content).toBeTruthy();
});

// ─── Sitemap.xml Present ───────────────────────────────────────
test('sitemap.xml exists and is accessible', async ({ page }) => {
  const response = await page.goto('/sitemap.xml');
  expect(response?.status()).toBe(200);
});

// ─── No Open Redirects ─────────────────────────────────────────
test('no open redirect via URL parameters', async ({ page }) => {
  const response = await page.goto('/?redirect=https://evil.com');
  expect(response?.status()).toBe(200);

  // Verify we're still on the same origin
  expect(page.url()).toContain('localhost');
  expect(page.url()).not.toContain('evil.com');
});

// ─── HTTPS Enforcement (Production) ────────────────────────────
test('no mixed content resources loaded', async ({ page }) => {
  const httpResources: string[] = [];

  page.on('response', (response) => {
    const url = response.url();
    if (url.startsWith('http://') && !url.includes('localhost')) {
      httpResources.push(url);
    }
  });

  await page.goto('/', { waitUntil: 'networkidle' });

  expect(
    httpResources,
    `HTTP resources loaded: ${httpResources.join(', ')}`,
  ).toHaveLength(0);
});
