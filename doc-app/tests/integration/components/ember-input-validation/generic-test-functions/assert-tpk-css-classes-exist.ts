import { find } from '@ember/test-helpers';
import { expect } from 'vitest';

export function assertTpkCssClassesExist(
  input: string,
  inputType: 'input' | 'textarea' = 'input',
) {
  expect(find(`.tpk-${input}-container`)).toBeTruthy();
  expect(
    find(`.tpk-${input}-container`)?.hasAttribute(
      `data-test-tpk-prefab-${input}-container`,
    ),
  ).toBe(true);
  expect(find(`.tpk-${input}-container .tpk-${input}-input`)).toBeTruthy();
  expect(find(`.tpk-${input}-container .tpk-validation-errors`)).toBeTruthy();
  expect(find(`.tpk-${input}-container .tpk-label`)).toBeTruthy();
  expect(find(`label`)?.classList.contains(`tpk-${input}-container`)).toBe(
    true,
  );
  expect(find(inputType)?.classList.contains(`tpk-${input}-input`)).toBe(true);
  expect(
    find(`label > div:first-of-type`)?.classList.contains(`tpk-label`),
  ).toBe(true);
  expect(
    find(`label > div:last-of-type`)?.classList.contains(
      `tpk-validation-errors`,
    ),
  ).toBe(true);
}
