import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
// @ts-ignore
import fs from 'fs';
import * as AxeHtmlReporter from 'axe-html-reporter';


test('Accessibility check for local home page', async ({ page }) => {
  await page.goto('/');

  const axe = new AxeBuilder({ page });

  // Run accessibility checks
  const results = await axe.analyze();
  const reportData = { results };
  // Fail the test if violations are found
  if (results.violations.length > 0) {
    const report = AxeHtmlReporter.createHtmlReport(reportData);
    fs.writeFileSync('accessibility-report.html', report);
    console.log('Accessibility Violations:', results.violations);
    throw new Error('Accessibility violations found!');
  } else {
    console.log('No accessibility violations found.');
  }
});
