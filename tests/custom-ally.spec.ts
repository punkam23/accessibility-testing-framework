import {test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
// @ts-ignore
import fs from 'fs';
import * as AxeHtmlReporter from 'axe-html-reporter';
import {Result} from 'axe-core';

test(`Accessibility check for Custom routes`, async ({page}) => {
  const routes: string[] = (test.info().config.metadata['routes'] as string[]).map(v => v.trim()).filter(Boolean);
  const tags: string[] = (test.info().config.metadata['tags'] as string[]).map(v => v.trim()).filter(Boolean);
  const rules: string[] = (test.info().config.metadata['rules'] as string[]).map(v => v.trim()).filter(Boolean);
  let violations: Result[] = [];
  let countReport = 1;

  for (const route of routes) {
    await page.goto(route);

    const axe = new AxeBuilder({page});
    console.log(`Rules ${rules} Tags ${tags}`);
    if (rules && rules?.length > 0)
      axe.withRules(rules);
    else if(tags && tags?.length > 0)
      axe.withTags(tags);

    const results = await axe.analyze();
    const reportData = {results};
    const report = AxeHtmlReporter.createHtmlReport(reportData);
    fs.writeFileSync(`./artifacts/accessibility-report-${countReport}.html`, report);
    // Fail the test if violations are found
    if (results.violations.length > 0) {
      console.log('Accessibility Violations', results.violations);
      violations.push(...results.violations);
      // throw new Error('Accessibility violations found!');
    } else {
      console.log('No accessibility violations found.');
    }
    countReport ++;
  }
  if(violations.length > 0) {
    throw new Error(`${violations.length} Accessibility violations found!`);
  }
});
