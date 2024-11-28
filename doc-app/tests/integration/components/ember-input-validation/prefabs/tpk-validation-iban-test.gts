import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { type TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationIban from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-iban';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module(
  'Integration | Component | Prefabs | tpk-validation-iban',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(this: ThisTestContext) {
      const immerChangeset = new ImmerChangeset({
        iban: '',
      });

      await render<ThisTestContext>(
        <template>
         <TpkValidationIban
            @label="label"
            @mandatory={{true}}
            @changeset={{immerChangeset}}
            @validationField="iban"
         />
        </template>
      );
      return immerChangeset;
    }

    test<ThisTestContext>('it block typing if country code is not supported', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-iban-input]', 'ZZ68539007547034');
      assert.strictEqual(changeset.get('iban'), 'ZZ');
    });

    test<ThisTestContext>('it lets you type BE IBAN and nicely format it', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-iban-input]', 'BE68539007547034');
      assert.strictEqual(changeset.get('iban'), 'BE68 5390 0754 7034');
    });

    test<ThisTestContext>('it lets you type LU IBAN and nicely format it', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-iban-input]', 'LU120010001234567891');
      assert.strictEqual(changeset.get('iban'), 'LU12 0010 0012 3456 7891');
    });

    test<ThisTestContext>('it lets you type NL IBAN and nicely format it', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-iban-input]', 'NL91ABNA0417164300');
      assert.strictEqual(changeset.get('iban'), 'NL91 ABNA 0417 1643 00');
    });

    test<ThisTestContext>('it lets you type FR IBAN and nicely format it', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn(
        '[data-test-tpk-iban-input]',
        'FR1420041010050500013M02606',
      );
      assert.strictEqual(
        changeset.get('iban'),
        'FR14 2004 1010 0505 0001 3M02 606',
      );
    });

    test<ThisTestContext>('it lets you type DE IBAN and nicely format it', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-iban-input]', 'DE91100000000123456789');
      assert.strictEqual(changeset.get('iban'), 'DE91 1000 0000 0123 4567 89');
    });

    test<ThisTestContext>('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await assertDataHasErrorAttribute(assert,changeset,'iban');
    });

    test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
      await renderComponentAndReturnChangeset.call(this);
      await assertTpkCssClassesExist(assert,'iban');
    });
  },
);
