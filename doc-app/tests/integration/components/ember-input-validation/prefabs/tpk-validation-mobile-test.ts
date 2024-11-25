/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import {
  type TestContext,
  fillIn,
  click,
  render,
  settled,
} from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import { selectChoose } from 'ember-power-select/test-support';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module(
  'Integration | Component | Prefabs | tpk-validation-mobile',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function setChangeset(
      this: TestContext,
      phoneValue: string = '+33712345678',
    ) {
      const changeset = new ImmerChangeset({ phone: phoneValue });
      this.set('changeset', changeset);
      return changeset;
    }

    async function renderComponent() {
      await render(
        hbs`<Prefabs::TpkValidationMobile @changeset={{this.changeset}} @validationField="phone" @label="Numéro de téléphone" />`,
      );
    }

    test('Should split country prefixe and phone number and show label', async function (assert) {
      await setChangeset.call(this);
      await renderComponent.call(this);
      assert.dom('.ember-power-select-selected-item').containsText('+33');
      assert.dom('.tpk-input-input').hasValue('7 12 34 56 78');
    });

    test('When change country prefixe should adapt mask', async function (assert) {
      await setChangeset.call(this);
      await renderComponent.call(this);
      assert.dom('.tpk-input-input').hasValue('7 12 34 56 78');
      await selectChoose('.ember-power-select-trigger', '+32');
      assert.dom('.tpk-input-input').hasValue('712 34 56 78');
    });

    test('Show default prefixe when phone number is empty', async function (assert) {
      await setChangeset.call(this, '');
      await renderComponent.call(this);
      assert.dom('.ember-power-select-selected-item').containsText('+32');
      assert.dom('.tpk-input-input').hasValue('');
    });

    test('Show default prefixe when phone number is not well formatted and show first number of phone number in input', async function (assert) {
      await setChangeset.call(this, '00345333443434');
      await renderComponent.call(this);
      assert.dom('.ember-power-select-selected-item').containsText('+32');
      assert.dom('.tpk-input-input').hasValue('003 45 33 34');
    });

    test('When change value for prefixe and phone number, changeset value should combine values', async function (this: ThisTestContext, assert) {
      await setChangeset.call(this, '');
      await renderComponent.call(this);
      await selectChoose('.ember-power-select-trigger', '+352');
      await fillIn('.tpk-input-input', '123456789');
      await click(document.body); // click outside to trigger update of mask only for test
      assert.dom('.ember-power-select-selected-item').containsText('+352');
      assert.dom('.tpk-input-input').hasValue('123 456 789');
      console.log(this.changeset.get('phone'));
      assert.strictEqual(this.changeset.get('phone'), '+352123456789');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await setChangeset.call(this, '');
      await renderComponent.call(this);
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'phone',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('t:required:()');
    });
  },
);
