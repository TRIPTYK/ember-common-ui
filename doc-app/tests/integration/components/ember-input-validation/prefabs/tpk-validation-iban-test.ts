import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { fillIn, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { type TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';

module(
  'Integration | Component | Prefabs | tpk-validation-iban',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(this: TestContext) {
      const immerChangeset = new ImmerChangeset({
        iban: '',
      });
      this.set('changeset', immerChangeset);

      await render(
        hbs`
         <Prefabs::TpkValidationIban
            @label="label"
            @changeset={{this.changeset}}
            @validationField="iban"
            class="custom-iban-class"
         />
        `,
      );
      return immerChangeset;
    }

    test('it block typing if country code is not supported', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'ZZ68539007547034');
      assert.strictEqual(changeset.get('iban'), 'ZZ');
    });

    test('it lets you type BE IBAN and nicely format it', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'BE68539007547034');
      assert.strictEqual(changeset.get('iban'), 'BE68 5390 0754 7034');
    });

    test('it lets you type LU IBAN and nicely format it', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'LU120010001234567891');
      assert.strictEqual(changeset.get('iban'), 'LU12 0010 0012 3456 7891');
    });

    test('it lets you type NL IBAN and nicely format it', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'NL91ABNA0417164300');
      assert.strictEqual(changeset.get('iban'), 'NL91 ABNA 0417 1643 00');
    });

    test('it lets you type FR IBAN and nicely format it', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn(
        '[data-test-tpk-input-input]',
        'FR1420041010050500013M02606',
      );
      assert.strictEqual(
        changeset.get('iban'),
        'FR14 2004 1010 0505 0001 3M02 606',
      );
    });

    test('it lets you type DE IBAN and nicely format it', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'DE91100000000123456789');
      assert.strictEqual(changeset.get('iban'), 'DE91 1000 0000 0123 4567 89');
    });

    test('Attributes should be passed to the input', async function (assert) {
      await renderComponentAndReturnChangeset.call(this);
      assert.dom('.tpk-input').hasClass('custom-iban-class');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'iban',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });
  },
);
