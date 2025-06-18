import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
// @ts-ignore
import fs from 'fs';
import * as AxeHtmlReporter from 'axe-html-reporter';
import dotenv from 'dotenv';


dotenv.config();
const routes = (process.env['ROUTES'] || '').split(',');
const rules = (process.env['ACCESSIBILITY_RULES'] || '').split(',').map(v => v.trim()).filter(Boolean);
const tags = (process.env['ACCESSIBILITY_TAGS'] || '').split(',').map(v => v.trim()).filter(Boolean);

console.log(`Routes ${routes}`);
console.log(`Rules ${rules} Tags ${tags}`);

routes.forEach((route) => {
  test(`Accessibility check for ${route}`, async ({page}) => {
    await page.goto(route);

    const axe = new AxeBuilder({page});

    if (rules && rules?.length > 0)
      axe.withRules(rules);
    else if(tags && tags?.length > 0)
      axe.withTags(tags);

    // Run accessibility checks
    const results = await axe.analyze();
    const reportData = {results};
    // Fail the test if violations are found
    if (results.violations.length > 0) {
      const report = AxeHtmlReporter.createHtmlReport(reportData);
      fs.writeFileSync(`./artifacts/accessibility-report-${route}.html`, report);
      console.log('Accessibility Violations', results.violations);
      throw new Error('Accessibility violations found!');
    } else {
      console.log('No accessibility violations found.');
    }
  });
});
