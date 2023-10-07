import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { TestContext, click, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

module('Integration | Component | tpk-validation-checkbox', function (hooks) {
  setupRenderingTest(hooks);

  async function setupComponent(this: TestContext) {
    const changeset = new ImmerChangeset({
      checked: true,
    });
    this.set('changeset', changeset);

    await render(
      hbs`<TpkValidationCheckbox @label="label" @changeset={{this.changeset}} @validationField="checked" as |T|>
          <T.Input />
          <T.Label />
        </TpkValidationCheckbox>`,
    );
    return changeset;
  }

  test('It changes data-has-error attribue on error', async function (assert) {
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
