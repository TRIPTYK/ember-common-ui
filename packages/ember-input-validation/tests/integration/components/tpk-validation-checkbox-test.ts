import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { click, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

module('Integration | Component | tpk-validation-checkbox', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with default syntax', async function (assert) {
    const changeset = new ImmerChangeset({
      checked: true,
    });
    this.set('changeset', changeset);

    await render(
      hbs`<TpkValidationCheckbox @label="label" @changeset={{this.changeset}} @validationField="checked" />`,
    );
    assert.dom('[data-test-tpk-checkbox]').exists();
    assert.dom('[data-test-tpk-checkbox-label]').containsText('label');
    assert.dom('[data-test-tpk-checkbox-input]').isChecked();

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

    assert.dom('[data-test-tpk-checkbox][data-has-error="true"]').exists();
    assert.dom('.tpk-validation-checkbox-error').exists().hasAnyText();
  });
});
