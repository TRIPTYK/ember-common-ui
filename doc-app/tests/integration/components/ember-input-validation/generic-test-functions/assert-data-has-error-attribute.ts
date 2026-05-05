import { find, settled } from '@ember/test-helpers';
import type ImmerChangeset from 'ember-immer-changeset';
import { expect } from 'vitest';

export async function assertDataHasErrorAttribute(
  changeset: ImmerChangeset,
  input: string,
) {
  changeset.addError({
    message: 'required',
    value: '',
    originalValue: '',
    key: input,
  });

  await settled();
  expect(
    find(`[data-test-tpk-${input}-input]`)?.textContent?.trim() || '',
  ).toBe('');

  expect(
    find(`[data-test-tpk-prefab-${input}-container]`)?.getAttribute(
      'data-has-error',
    ),
  ).toBe('true');
}
