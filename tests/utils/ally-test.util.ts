import {Result} from 'axe-core';

export class AccessibilityUtils {
  static calculateTotalViolations(results: Result[]) {
    const subNodes = results.reduce((total, violation) => total + violation.nodes.length, 0); // Sum of nodes across all violations
    return { total: subNodes };
  }
}
