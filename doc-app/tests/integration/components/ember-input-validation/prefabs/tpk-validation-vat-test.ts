import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { fillIn, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { type TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';

module(
  'Integration | Component | Prefabs | tpk-validation-vat',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(this: TestContext) {
      const immerChangeset = new ImmerChangeset({
        vat: '',
      });
      this.set('changeset', immerChangeset);

      await render(
        hbs`
         <Prefabs::TpkValidationVat
            @label="label"
            @changeset={{this.changeset}}
            @validationField="vat"
            class="custom-vat-class"
         />
        `,
      );
      return immerChangeset;
    }

    test('it block typing if country code is not supported', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'ZZ68539007547034');
      assert.strictEqual(changeset.get('vat'), 'ZZ');
    });

    test('it lets you type BE VAT', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'BE0999999999');
      assert.strictEqual(changeset.get('vat'), 'BE0999999999');
    });

    test('it lets you type LU VAT', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'LU99999999');
      assert.strictEqual(changeset.get('vat'), 'LU99999999');
    });

    test('it lets you type NL VAT', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'NL000099998B57');
      assert.strictEqual(changeset.get('vat'), 'NL000099998B57');
    });

    test('it lets you type FR VAT', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'FR12345678901');
      assert.strictEqual(changeset.get('vat'), 'FR12345678901');
    });

    test('it lets you type DE VAT', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'DE123456789');
      assert.strictEqual(changeset.get('vat'), 'DE123456789');
    });

    test('Attributes should be passed to the input', async function (assert) {
      await renderComponentAndReturnChangeset.call(this);
      assert.dom('.tpk-input').hasClass('custom-vat-class');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'vat',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });
  },
);
