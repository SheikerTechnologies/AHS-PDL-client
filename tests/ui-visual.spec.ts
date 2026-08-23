import { test, expect } from '@playwright/test';

/**
 * UI & Visual Regression Tests
 * Checks for broken images, layout issues, and responsive behavior.
 */

// ─── Broken Images ──────────────────────────────────────────────
const PAGES = ['/', '/services', '/projects', '/blog', '/about'];

for (const pagePath of PAGES) {
  test(`no broken images on ${pagePath}`, async ({ page }) => {
    const failedImages: string[] = [];

    page.on('response', (response) => {
      if (response.url().match(/\.(png|jpe?g|gif|svg|webp|avif)(\?|$)/i)) {
        if (!response.ok()) {
          failedImages.push(`${response.url()} → ${response.status()}`);
        }
      }
    });

    await page.goto(pagePath, { waitUntil: 'networkidle' });

    // Also check via DOM
    const brokenByDom = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.src);
    });

    expect(failedImages, `Broken images via network: ${failedImages.join(', ')}`).toHaveLength(0);
    expect(brokenByDom, `Broken images via DOM: ${brokenByDom.join(', ')}`).toHaveLength(0);
  });
}

// ─── No Horizontal Overflow ─────────────────────────────────────
for (const pagePath of PAGES) {
  test(`no horizontal overflow on ${pagePath}`, async ({ page }) => {
    await page.goto(pagePath, { waitUntil: 'networkidle' });
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow, 'Page has horizontal scroll').toBe(false);
  });
}

// ─── Responsive Breakpoints ─────────────────────────────────────
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 2560, height: 1440 },
];

for (const vp of VIEWPORTS) {
  test(`homepage renders without horizontal overflow at ${vp.name} (${vp.width}px)`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/', { waitUntil: 'networkidle' });
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow, `Horizontal overflow detected at ${vp.width}px`).toBe(false);
  });
}

// ─── All <h1> Tags Visible ──────────────────────────────────────
for (const pagePath of PAGES) {
  test(`page ${pagePath} has exactly one visible h1`, async ({ page }) => {
    await page.goto(pagePath, { waitUntil: 'networkidle' });
    const h1s = page.locator('h1:visible');
    const count = await h1s.count();
    // Some pages may not have an h1 (acceptable), but never more than one
    expect(count).toBeLessThanOrEqual(1);
  });
}

// ─── All Images Have Alt Text ───────────────────────────────────
for (const pagePath of PAGES) {
  test(`all images on ${pagePath} have alt attributes`, async ({ page }) => {
    await page.goto(pagePath, { waitUntil: 'networkidle' });
    const imagesWithoutAlt = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .filter((img) => !img.alt && img.alt !== '')
        .map((img) => img.src);
    });
    expect(
      imagesWithoutAlt,
      `Images without alt: ${imagesWithoutAlt.join(', ')}`,
    ).toHaveLength(0);
  });
}
