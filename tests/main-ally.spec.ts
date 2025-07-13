import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
// @ts-ignore
import fs from 'fs';
import * as AxeHtmlReporter from 'axe-html-reporter';
import dotenv from 'dotenv';
import {AccessibilityUtils} from './utils/ally-test.util';


dotenv.config();
const routes = (process.env['ROUTES'] || '').split(',');
const rules = (process.env['ACCESSIBILITY_RULES'] || '').split(',').map(v => v.trim()).filter(Boolean);
const tags = (process.env['ACCESSIBILITY_TAGS'] || '').split(',').map(v => v.trim()).filter(Boolean);

console.log(`Routes ${routes}`);
console.log(`Rules ${rules} Tags ${tags}`);

routes.forEach((route, index) => {
  test(`Accessibility check for ${route}`, async ({page}) => {
    await page.goto(route);

    await page.waitForLoadState('networkidle');
    const axe = new AxeBuilder({page});

    if (rules && rules?.length > 0)
      axe.withRules(rules);
    else if(tags && tags?.length > 0)
      axe.withTags(tags);

    // Run accessibility checks
    const results = await axe.analyze();
    const failedNodes = results.violations.length;

    let totalViolationsFound = AccessibilityUtils.calculateTotalViolations(results.violations);
    if (fs.existsSync(`./artifacts/violations-count.json`)) {
      const data = JSON.parse(fs.readFileSync(`./artifacts/violations-count.json`, 'utf-8'));
      totalViolationsFound.total += data.total;
    }
    fs.writeFileSync(`./artifacts/violations-count.json`, JSON.stringify({ total: totalViolationsFound.total }));

    const passedNodes = results.passes.length;
    const testedNodes = failedNodes + passedNodes;
    const failurePercent = testedNodes > 0 ? (failedNodes / testedNodes) * 100 : 0;
    const passedPercent = testedNodes > 0 ? (passedNodes / testedNodes) * 100 : 0;

    const report = AxeHtmlReporter.createHtmlReport({results});
    const metadataHtml = report.replace(
      /<h1[^>]*>[^<]*<\/h1>/,
      match => `${match}
    <section style="margin-top: 1em; padding: 1em; background: #f9f9f9; border: 1px solid #ddd;">
      <h2>Accessibility Coverage</h2>
      <p><strong>Coverage:</strong> ${passedPercent.toFixed(2)}%</p>
      <p><strong>Failed Percentage:</strong> ${failurePercent.toFixed(2)}%</p>
    </section>`
    );

    fs.writeFileSync(`./artifacts/accessibility-report-${index + 1}.html`, metadataHtml);
    // Fail the test if violations are found
    if (results.violations.length > 0) {
      console.log('Accessibility Violations', results.violations);
      throw new Error('Accessibility violations found!');
    } else {
      console.log('No accessibility violations found.');
    }
  });
});

test.afterAll(async () => {
  const data = JSON.parse(fs.readFileSync(`./artifacts/violations-count.json`, 'utf-8'));
  console.log(`Total accessibility violations across all routes: ${data.total}`);
});
