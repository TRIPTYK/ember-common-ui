import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, click, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationCheckbox from '@triptyk/ember-input-validation/components/tpk-validation-checkbox';

interface TpkCheckboxValidationTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module('Integration | Component | tpk-validation-checkbox', function (hooks) {
  setupRenderingTest(hooks);

  async function setupComponent(this: TpkCheckboxValidationTestContext) {
    const changeset = new ImmerChangeset({
      checked: true,
    });
    await render<TpkCheckboxValidationTestContext>(
      <template>
        <TpkValidationCheckbox @label="label" @changeset={{changeset}} @validationField="checked" as |T|>
          <T.Input />
          <T.Label />
        </TpkValidationCheckbox>
      </template>
    );
    return changeset;
  }

  test<TpkCheckboxValidationTestContext>('It changes data-has-error attribue on error', async function (assert) {
    const changeset = await setupComponent.call(this);
    assert.dom('[data-test-tpk-checkbox]').exists();
    assert.dom('[data-test-tpk-checkbox-label]').containsText('label');
    assert.dom('[data-test-tpk-checkbox-input]').isChecked();

    assert.dom('.tpk-checkbox[data-has-error="false"]').exists();
    await click('[data-test-tpk-checkbox-input]');
    assert.dom('[data-test-tpk-checkbox-input]').isNotChecked();
    assert.false(changeset.get('checked'));

    changeset.addError({
      message: 'required',
      value: false,
      originalValue: true,
      key: 'checked',
    });

    await settled();

    assert.dom('.tpk-checkbox[data-has-error="true"]').exists();
  });
});
