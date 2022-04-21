/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, settled } from '@ember/test-helpers';
import { Changeset } from 'ember-changeset';
// @ts-expect-error
import lookupValidator from 'ember-changeset-validations';
import {
  validatePresence,
  // @ts-expect-error
} from 'ember-changeset-validations/validators';
// @ts-expect-error
import { setFlatpickrDate } from 'ember-flatpickr/test-support/helpers';

const validations = {
  date: [validatePresence(true)],
};

module('Integration | Component | tpk-validation-datepicker', function (hooks) {
  setupRenderingTest(hooks);

  test('DEFAULT | it works with default syntax', async function (assert) {
    const date = new Date();
    this.set(
      'changeset',
      Changeset(
        {
          date,
        },
        lookupValidator(validations),
        validations
      )
    );

    await render(
      hbs`<TpkValidationDatepicker @label="label" @changeset={{this.changeset}} @validationField="date" />`
    );
    assert.dom('[data-test-tpk-datepicker]').exists();
    assert.dom('[data-test-tpk-datepicker-label]').containsText('label');

    await setFlatpickrDate('[data-test-tpk-datepicker-content]', '');
    await settled();
    assert.dom('[data-test-tpk-datepicker-content]').hasNoText();
    assert
      .dom('[data-test-tpk-datepicker]')
      .hasAttribute('data-has-error', 'true');
    assert
      .dom('.tpk-validation-datepicker-error-container')
      .exists()
      .hasAnyText();
  });
});
