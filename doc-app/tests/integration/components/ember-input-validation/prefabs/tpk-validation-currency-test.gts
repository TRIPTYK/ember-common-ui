
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, fillIn, render, settled } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationCurrency from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-currency';

interface ThisTestContext extends TestContext {

}

module(
  'Integration | Component | Prefabs | tpk-validation-currency',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(
      this: ThisTestContext,
      scale: number = 2,
    ) {
      const changeset = new ImmerChangeset({
        value: 123.56,
      });

      const onChange = (value: number) => {
        changeset.set('value', value);
      };

      await render<ThisTestContext>(
        <template>
        <TpkValidationCurrency class="custom-class"  @changeset={{changeset}} @onChange={{onChange}} @validationField="value" @scale={{scale}} />
        </template>,
      );

      return changeset;
    }

    // currently, only euro is supported
    test('Currency should be euro by default', async function (this: ThisTestContext,assert) {
      await renderComponentAndReturnChangeset.call(this);
      assert.dom('input').hasValue('123.56 €');
    });

    test('Input type should be text (mandatory for IMask)', async function (this: ThisTestContext,assert) {
      await renderComponentAndReturnChangeset.call(this);
      assert.dom('input').hasAttribute('type', 'text');
    });

    test('Should set value as number', async function (this: ThisTestContext, assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      assert.strictEqual(changeset.get('value'), 123.56);
    });

    test('Should set value as number when value change', async function (this: ThisTestContext, assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('input', '123.45');
      assert.strictEqual(changeset.get('value'), 123.45);
    });

    test('@scale should control the decimals of the input', async function (this: ThisTestContext,assert) {
      await renderComponentAndReturnChangeset.call(this, 3);
      assert.dom('input').hasValue('123.560 €');
    });

    test('Error prefab appears if an error is added to changeset', async function (this: ThisTestContext,assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'value',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });
  },
);
