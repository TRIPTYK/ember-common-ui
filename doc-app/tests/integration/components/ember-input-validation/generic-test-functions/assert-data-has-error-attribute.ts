import { pauseTest, settled } from "@ember/test-helpers";
import type ImmerChangeset from "ember-immer-changeset";
import { log } from "qunit";

export async function assertDataHasErrorAttribute(
  assert: Assert,
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
  assert.dom(`[data-test-tpk-${input}-input]`).hasNoText();

  assert
    .dom(`[data-test-tpk-prefab-${input}-container]`)
    .hasAttribute('data-has-error', 'true');
}