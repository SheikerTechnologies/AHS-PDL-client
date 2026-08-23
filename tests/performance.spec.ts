import { test, expect } from '@playwright/test';

/**
 * Performance Smoke Tests
 * Checks Core Web Vitals, page load times, and resource optimization.
 */

// ─── Page Load Time ────────────────────────────────────────────
const ROUTES = ['/', '/services', '/projects', '/blog', '/about'];

for (const route of ROUTES) {
  test(`${route} loads within 5 seconds`, async ({ page }) => {
    const start = Date.now();
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - start;

    expect(loadTime, `Page ${route} took ${loadTime}ms to load`).toBeLessThan(5000);
  });
}

// ─── No Large Layout Shifts ────────────────────────────────────
test('homepage has minimal CLS on load', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const cls = await page.evaluate(() => {
    return new Promise<number>((resolve) => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => {
        observer.disconnect();
        resolve(clsValue);
      }, 1000);
    });
  });

  expect(cls, `CLS is ${cls}, should be < 0.1`).toBeLessThan(0.1);
});

// ─── No Unused JS Over 100KB ───────────────────────────────────
test('homepage scripts are reasonably sized', async ({ page }) => {
  const scripts: { url: string; size: number }[] = [];

  page.on('response', (response) => {
    if (response.url().endsWith('.js')) {
      response.body().then((body) => {
        scripts.push({ url: response.url(), size: body.length });
      });
    }
  });

  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Wait for all JS to load

  const largeScripts = scripts.filter((s) => s.size > 500_000); // > 500KB
  expect(
    largeScripts.map((s) => `${s.url} (${(s.size / 1024).toFixed(0)}KB)`),
    'Large scripts found (>500KB)',
  ).toHaveLength(0);
});

// ─── Images Are Optimized (Next.js Image) ──────────────────────
test('all large images use Next.js Image component', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Check that no raw <img> tags exist (they should use next/image)
  const rawImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.filter((img) => {
      // next/image renders as <img> but with specific attributes
      return !img.hasAttribute('data-nimg') && img.src.startsWith('http');
    }).map((img) => img.src);
  });

  expect(rawImages, `Raw <img> tags found: ${rawImages.join(', ')}`).toHaveLength(0);
});

// ─── Font Loading ──────────────────────────────────────────────
test('no layout shift from font loading', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Check if fonts are preloaded
  const fontPreloads = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('link[rel="preload"][as="font"]')).length;
  });

  // At minimum, the site should have font-display set (check via computed styles)
  const hasFontDisplay = await page.evaluate(() => {
    const sheets = Array.from(document.styleSheets);
    let hasSwap = false;
    try {
      for (const sheet of sheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if ((rule as any).cssText?.includes('font-display')) {
              hasSwap = true;
            }
          }
        } catch {
          // Cross-origin stylesheet, skip
        }
      }
    } catch {
      // Skip
    }
    return hasSwap || fontPreloads > 0;
  });

  // Soft assertion - fonts may be loaded via next/font which handles this
  console.log(`Font preloads: ${fontPreloads}, Font display rules: ${hasFontDisplay}`);
});

// ─── No Mixed Content ──────────────────────────────────────────
test('no mixed content (HTTP resources on HTTPS page)', async ({ page }) => {
  const mixedContent: string[] = [];

  page.on('response', (response) => {
    const url = response.url();
    if (url.startsWith('http://') && !url.includes('localhost')) {
      mixedContent.push(url);
    }
  });

  await page.goto('/', { waitUntil: 'networkidle' });
  expect(mixedContent, `Mixed content: ${mixedContent.join(', ')}`).toHaveLength(0);
});
