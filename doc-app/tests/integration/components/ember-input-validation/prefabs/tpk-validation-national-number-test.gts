import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { type TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationNationalNumber from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-national-number';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module(
  'Integration | Component | Prefabs | tpk-validation-national-number',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(this: TestContext) {
      const immerChangeset = new ImmerChangeset({
        nationalNumber: '',
      });

      await render<ThisTestContext>(
        <template>
         <TpkValidationNationalNumber
            @label="label"
            @changeset={{immerChangeset}}
            @validationField="nationalNumber"
            class="custom-national-number-class"
         />
        </template>,
      );
      return immerChangeset;
    }

    test('let only number character go through', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'SEBOUISNICE');
      assert.strictEqual(changeset.get('nationalNumber'), '');
    });

    test('it format nicely the national number', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', '99121223453');
      assert.strictEqual(changeset.get('nationalNumber'), '99.12.12-234.53');
    });

    test('Attributes should be passed to the input', async function (assert) {
      await renderComponentAndReturnChangeset.call(this);
      assert.dom('.tpk-input').hasClass('custom-national-number-class');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'nationalNumber',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });
  },
);
