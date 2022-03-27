import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { click, render } from '@ember/test-helpers';
import { Changeset } from 'ember-changeset';
// @ts-expect-error
import lookupValidator from 'ember-changeset-validations';
import {
  validateInclusion,
  // @ts-expect-error
} from 'ember-changeset-validations/validators';

const validations = {
  checked: [validateInclusion({ list: [true] })],
};

module('Integration | Component | tpk-validation-checkbox', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with default syntax', async function (assert) {
    this.set(
      'changeset',
      Changeset(
        {
          checked: true,
        },
        lookupValidator(validations),
        validations
      )
    );

    await render(
      hbs`<TpkValidationCheckbox @label="label" @changeset={{this.changeset}} @validationField="checked" />`
    );
    assert.dom('[data-test-tpk-checkbox]').exists();
    assert.dom('[data-test-tpk-checkbox-label]').containsText('label');
    assert.dom('[data-test-tpk-checkbox-input]').isChecked();

    await click('[data-test-tpk-checkbox-input]');
    assert.dom('[data-test-tpk-checkbox-input]').isNotChecked();
    assert.dom('[data-test-tpk-checkbox][data-has-error="true"]').exists();
    assert.dom('.tpk-validation-checkbox-error').exists().hasAnyText();
  });
});
