import { test, expect } from '@playwright/test';

/**
 * Certificate Protection Tests
 * Ensures the APDL RJSC certificate image cannot be downloaded
 * and that the view certificate link works correctly.
 */

// ─── Certificate Image: Not Draggable ──────────────────────────
test('certificate image on services page is not draggable', async ({ page }) => {
  await page.goto('/services', { waitUntil: 'networkidle' });

  const certImage = page.locator('img[alt="Certificate of Incorporation"]');
  await expect(certImage).toBeVisible();

  const draggable = await certImage.getAttribute('draggable');
  expect(draggable).toBe('false');
});

// ─── Certificate Image: Right-Click Blocked ────────────────────
test('certificate section on services page blocks right-click', async ({ page }) => {
  await page.goto('/services', { waitUntil: 'networkidle' });

  const certContainer = page.locator('[oncontextmenu]').first();
  const hasBlocker = await certContainer.count();
  expect(hasBlocker).toBeGreaterThan(0);
});

// ─── Certificate Image: No Download Link ──────────────────────
test('services page has no download link for certificate', async ({ page }) => {
  await page.goto('/services', { waitUntil: 'networkidle' });

  // Check there's no <a> with download attribute pointing to certificate
  const downloadLinks = page.locator('a[download*="APDL"], a[download*="certificate"], a[href*="APDL"][download]');
  const count = await downloadLinks.count();
  expect(count).toBe(0);
});

// ─── Certificate Image: select-none Class ──────────────────────
test('certificate image has select-none class', async ({ page }) => {
  await page.goto('/services', { waitUntil: 'networkidle' });

  const certImage = page.locator('img[alt="Certificate of Incorporation"]');
  const className = await certImage.getAttribute('class');
  expect(className).toContain('select-none');
});

// ─── Home Page Certificate Section: Not Draggable ─────────────
test('certificate image on homepage is not draggable', async ({ page }) => {
  await page.goto('/#certificate-section', { waitUntil: 'networkidle' });

  const certImage = page.locator('img[alt="APDL RJSC Registration Certificate"]');
  await expect(certImage).toBeVisible();

  const draggable = await certImage.getAttribute('draggable');
  expect(draggable).toBe('false');
});

// ─── Home Page Certificate: Right-Click Blocked ────────────────
test('certificate section on homepage blocks right-click', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const certSection = page.locator('#certificate-section');
  const hasBlocker = await certSection.evaluate((el) => {
    return el.hasAttribute('oncontextmenu');
  });
  expect(hasBlocker).toBe(true);
});

// ─── Home Page Certificate: No Download Link ──────────────────
test('homepage has no download link for certificate', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const downloadLinks = page.locator('a[download*="APDL"], a[download*="certificate"], a[href*="APDL"][download]');
  const count = await downloadLinks.count();
  expect(count).toBe(0);
});

// ─── View Certificate Link: Correct Target ────────────────────
test('services page View Certificate link points to homepage certificate section', async ({ page }) => {
  await page.goto('/services', { waitUntil: 'networkidle' });

  const link = page.locator('a[href="/#certificate-section"]');
  await expect(link).toBeVisible();
  await expect(link).toContainText('View Certificate');
});
