/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import {
  type TestContext,
  fillIn,
  click,
  findAll,
  render,
  settled,
} from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import tpkSelect from 'dummy/tests/pages/tpk-select';

module(
  'Integration | Component | Prefabs | tpk-validation-phone',
  function (hooks) {
    setupRenderingTest(hooks);

    async function setChangeset(
      this: TestContext,
      phoneValue: string = '+33712345678',
    ) {
      this.set('changeset', new ImmerChangeset({ phone: phoneValue }));
    }

    async function renderComponent() {
      await render(
        hbs`<Prefabs::TpkValidationPhone @changeset={{this.changeset}} @validationField="phone" />`,
      );
    }

    test('Should split country prefixe and phone number', async function (assert) {
      await setChangeset.call(this);
      await renderComponent.call(this);
      assert.dom('.tpk-select-button').containsText('+33');
      assert.dom('.tpk-input-input').hasValue('7 12 34 56 78');
    });

    test('When change country prefixe should adapt mask', async function (assert) {
      await setChangeset.call(this);
      await renderComponent.call(this);
      assert.dom('.tpk-input-input').hasValue('7 12 34 56 78');
      await tpkSelect.button.click();
      await tpkSelect.listbox.options[1].click();
      assert.dom('.tpk-input-input').hasValue('712 34 56 78');
    });

    test('Show default prefixe when phone number is empty', async function (assert) {
      await setChangeset.call(this, '');
      await renderComponent.call(this);
      assert.dom('.tpk-select-button').containsText('+32');
      assert.dom('.tpk-input-input').hasValue('');
    });

    test('Show default prefixe when phone number is not well formatted and show first number of phone number in input', async function (assert) {
      await setChangeset.call(this, '00345333443434');
      await renderComponent.call(this);
      assert.dom('.tpk-select-button').containsText('+32');
      assert.dom('.tpk-input-input').hasValue('003 45 33 34');
    });

    test('When change value for prefixe and phone number, changeset value should combine values', async function (assert) {
      await setChangeset.call(this, '');
      await renderComponent.call(this);
      await this.pauseTest();
      await tpkSelect.button.click();
      await tpkSelect.listbox.options[4].click();
      await fillIn('.tpk-input-input', '123456789');
      await click(document.body); // click outside to trigger update of mask only for test
      assert.dom('.tpk-select-button').containsText('+352');
      assert.dom('.tpk-input-input').hasValue('123 456 789');
      assert.strictEqual(this.changeset.get('phone'), '+352123456789');
    });
  },
);
