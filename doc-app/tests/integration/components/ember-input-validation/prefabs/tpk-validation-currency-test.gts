
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, fillIn, render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationCurrency from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-currency';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module(
  'Integration | Component | Prefabs | tpk-validation-currency',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    function setupChangeset(this: ThisTestContext) {
      return  new ImmerChangeset({
        currency: 123.56,
      });
    }

    async function renderComponent(
      changeset: ImmerChangeset,
      scale: number = 2,
    ) {

      const onChange = (value: number) => {
        changeset.set('currency', value);
      };

      await render<ThisTestContext>(
        <template>
          <TpkValidationCurrency 
          @changeset={{changeset}} 
          @onChange={{onChange}} 
          @validationField="currency" 
          @scale={{scale}} />
        </template>,
      );

    }

    // currently, only euro is supported
    test('Currency should be euro by default', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      assert.dom('input').hasValue('123.56 €');
    });

    test('Input type should be text (mandatory for IMask)', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      assert.dom('input').hasAttribute('type', 'text');
    });

    test('Should set value as number', async function (this: ThisTestContext, assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      assert.strictEqual(changeset.get('currency'), 123.56);
    });

    test('Should set value as number when value change', async function (this: ThisTestContext, assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      await fillIn('input', '123.45');
      assert.strictEqual(changeset.get('currency'), 123.45);
    });

    test('@scale should control the decimals of the input', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset, 3);
      assert.dom('[data-test-tpk-currency-input]').hasValue('123.560 €');
    });

    test('Error prefab appears if an error is added to changeset', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      await assertDataHasErrorAttribute(assert,changeset,'currency');
    });

    test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      await assertTpkCssClassesExist(assert,'currency');
    });
  },
);
