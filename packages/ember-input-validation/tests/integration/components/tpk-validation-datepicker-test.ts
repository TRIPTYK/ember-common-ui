/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, settled } from '@ember/test-helpers';
// @ts-expect-error
import { setFlatpickrDate } from 'ember-flatpickr/test-support/helpers';
import { ImmerChangeset } from 'ember-form-changeset-validations';

module('Integration | Component | tpk-validation-datepicker', function (hooks) {
  setupRenderingTest(hooks);

  test('DEFAULT | it works with default syntax', async function (assert) {
    const date = new Date();
    const changeset = new ImmerChangeset({
      date,
    });
    this.set('changeset', changeset);

    await render(
      hbs`<TpkValidationDatepicker @label="label" @changeset={{this.changeset}} @validationField="date" />`,
    );
    assert.dom('[data-test-tpk-datepicker]').exists();
    assert.dom('[data-test-tpk-datepicker-label]').containsText('label');

    await setFlatpickrDate('[data-test-tpk-datepicker-content]', '');
    await settled();

    assert.dom('[data-test-tpk-datepicker-content]').hasNoText();

    changeset.addError('date', {
      message: 'required',
      value: '',
      originalValue: 'a',
      key: 'date',
    });

    await settled();

    assert
      .dom('[data-test-tpk-datepicker]')
      .hasAttribute('data-has-error', 'true');
    assert
      .dom('.tpk-validation-datepicker-error-container')
      .exists()
      .hasAnyText();
  });
});
