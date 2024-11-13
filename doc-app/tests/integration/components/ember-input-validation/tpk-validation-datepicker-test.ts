import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, render, settled } from '@ember/test-helpers';
import { setTempusDominusDate } from '@triptyk/ember-input/test-support/datepicker-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

module('Integration | Component | tpk-validation-datepicker', function (hooks) {
  setupRenderingTest(hooks);

  async function setupComponent(this: TestContext) {
    const date = new Date();
    const changeset = new ImmerChangeset({
      date,
    });
    this.set('changeset', changeset);

    await render(
      hbs`<TpkValidationDatepicker @label="label" @changeset={{this.changeset}} @validationField="date" as |T|>
          <T.Input />
          <T.Label />
        </TpkValidationDatepicker>
      `,
    );
    return changeset;
  }

  test('It changes data-has-error attribue on error', async function (assert) {
    const changeset = await setupComponent.call(this);
    assert.dom('[data-test-tpk-datepicker]').exists();
    assert.dom('[data-test-tpk-label]').containsText('label');

    setTempusDominusDate('[data-test-tpk-datepicker-content]', '');
    await settled();

    assert.dom('[data-test-tpk-datepicker-content]').hasNoText();

    assert
      .dom('[data-test-tpk-datepicker]')
      .hasAttribute('data-has-error', 'false');

    changeset.addError({
      message: 'required',
      value: '',
      originalValue: 'a',
      key: 'date',
    });

    await settled();

    assert.strictEqual(changeset.get('date'), null);

    assert
      .dom('[data-test-tpk-datepicker]')
      .hasAttribute('data-has-error', 'true');
  });
});
