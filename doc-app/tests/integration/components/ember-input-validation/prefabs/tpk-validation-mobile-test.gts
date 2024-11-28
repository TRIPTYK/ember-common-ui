
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {

  fillIn,
  click,
  render,
  settled,
} from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import { selectChoose } from 'ember-power-select/test-support';
import TpkValidationMobile from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-mobile';



module(
  'Integration | Component | Prefabs | tpk-validation-mobile',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function setChangeset(

      phoneValue: string = '+33712345678',
    ) {
      return new ImmerChangeset({ phone: phoneValue });
    }

    async function renderComponent(changeset: ImmerChangeset) {
      await render(
        <template><TpkValidationMobile @changeset={{changeset}} @validationField="phone" @label="Numéro de téléphone" /></template>,
      );
    }

    test('Should split country prefixe and phone number and show label', async function (assert) {
      const changeset = await setChangeset();
      await renderComponent(changeset);
      assert.dom('.ember-power-select-selected-item').containsText('+33');
      assert.dom('input').hasValue('7 12 34 56 78');
    });

    test('When change country prefixe should adapt mask', async function (assert) {
      const changeset = await setChangeset();
      await renderComponent(changeset);
      assert.dom('input').hasValue('7 12 34 56 78');
      await selectChoose('.ember-power-select-trigger', '+32');
      assert.dom('input').hasValue('712 34 56 78');
    });

    test('Show default prefixe when phone number is empty', async function (assert) {
      const changeset = await setChangeset( '');
      await renderComponent(changeset);
      assert.dom('.ember-power-select-selected-item').containsText('+32');
      assert.dom('input').hasValue('');
    });

    test('Show default prefixe when phone number is not well formatted and show first number of phone number in input', async function (assert) {
      const changeset = await setChangeset( '00345333443434');
      await renderComponent(changeset);
      assert.dom('.ember-power-select-selected-item').containsText('+32');
      assert.dom('input').hasValue('003 45 33 34');
    });

    test('When change value for prefixe and phone number, changeset value should combine values', async function ( assert) {
      const changeset = await setChangeset( '');
      await renderComponent(changeset);
      await selectChoose('.ember-power-select-trigger', '+352');
      await fillIn('input', '123456789');
      await click(document.body); // click outside to trigger update of mask only for test
      assert.dom('.ember-power-select-selected-item').containsText('+352');
      assert.dom('input').hasValue('123 456 789');
      console.log(changeset.get('phone'));
      assert.strictEqual(changeset.get('phone'), '+352123456789');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await setChangeset( '');
      await renderComponent(changeset);
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'phone',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      const changeset = await setChangeset( '');
      await renderComponent(changeset);
      assert.dom(`.tpk-mobile-container`).exists().hasAttribute(`data-test-tpk-prefab-mobile-container`);
      assert.dom(`.tpk-mobile-container .tpk-mobile-content`).exists()
      assert.dom(`.tpk-mobile-container .tpk-mobile-input`).exists()
      assert.dom(`.tpk-mobile-container .tpk-validation-errors`).exists()
      assert.dom(`.tpk-mobile-container .tpk-label`).exists()
      assert.dom(`label`).hasClass(`tpk-mobile-label-container`);
      assert.dom(`input`).hasClass(`tpk-mobile-input`);
      assert.dom(`label > div:first-of-type`).hasClass(`tpk-label`, `The first div inside label has the class tpk-label.`);
      assert.dom(`.tpk-mobile-container > div:last-of-type`).hasClass(`tpk-validation-errors`, `The second div inside tpk-mobile-container has the class tpk-validation-errors.`);
    });
  },
);
