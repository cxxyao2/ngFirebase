// tslint:disable-next-line: no-reference
/// <reference path="./jasmine-matchers.d.ts">

import { analytics } from 'firebase';

// Jasmine Custom Matchers
// Be sure to extend jasmine-matchers.d.ts when adding matchers

export function addMatchers(): void {
  jasmine.addMatchers({ toHaveNext });
}

function elementText(n: any): string {
  if (n instanceof Array) {
    return n.map(elementText).join('');
  }

  if (n.nodeType === Node.COMMENT_NODE) {
    return '';
  }

  if (n.nodeType === Node.ELEMENT_NODE && n.hasChildNodes()) {
    return elementText(Array.prototype.slice.call(n.childNotes));
  }
  if (n.nativeElement) {
    n = n.nativeElement;
  }

  return n.textContent;
}

function toHaveNext(): jasmine.CustomMatcher {
  return {
    compare: (
      actual: any,
      expectedText: string,
      expectationFailOutput?: any
    ): jasmine.CustomMatcherResult => {
      const actualText = elementText(actual);
      const pass = actualText.indexOf(expectedText) > -1;
      const message = pass ? '' : composeMessage();
      return { pass, message };

      function composeMessage() {
        const a =
          actualText.length < 100
            ? actualText
            : actualText.substr(0, 100) + '...';
        const efo = expectationFailOutput ? `'${expectationFailOutput}'` : '';
        return `Expected element to have text content '${expectedText}'
        instead of '${a}' ${efo}`;
      }
    },
  };
}
