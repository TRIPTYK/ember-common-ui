import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, settled, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationInputPrefabComponent from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module(
  'Integration | Component | Prefabs | tpk-validation-input',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    function setupChangeset(this: ThisTestContext) {
      return new ImmerChangeset({
        input: 'value',
      });
    }

    async function renderComponent(changeset: ImmerChangeset) {
      await render<ThisTestContext>(
        <template>
        <TpkValidationInputPrefabComponent @changeset={{changeset}} @validationField="input" @label="label" @mandatory={{true}} />
        </template>
      );

    }

    test('renders input with default structure and with mandatory', async function (this: ThisTestContext, assert) {
     const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      assert.dom('[data-test-tpk-label]').exists();
      assert.dom('[data-test-tpk-input-input]').exists();
      assert.dom('[data-test-tpk-label]').containsText('label *');
      assert.dom('[data-test-tpk-input-input]').hasValue('value');
    });

    test('It changes data-has-error attribute on error', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);

      changeset.addError({
        message: 'required',
        value: '',
        originalValue: '',
        key: 'input',
      });

      await settled();
      assert.dom('[data-test-tpk-input-input]').hasNoText();
      assert
        .dom('[data-test-tpk-input]')
        .hasAttribute('data-has-error', 'true');
    });

    test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
     const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      assert.dom('.tpk-input-container').exists().hasAttribute('data-test-tpk-input');
      assert.dom('.tpk-input-container .tpk-text-input').exists()
      assert.dom('.tpk-input-container .tpk-validation-errors').exists()
      assert.dom('.tpk-input-container .tpk-label').exists()
      assert.dom('label').hasClass('tpk-input-container');
      assert.dom('input').hasClass('tpk-text-input');
      assert.dom('label > div:first-of-type').hasClass('tpk-label', 'The first div inside label has the class tpk-label.');
      assert.dom('label > div:nth-of-type(2)').hasClass('tpk-validation-errors', 'The second div inside label has the class tpk-validation-errors.');
    });
  },
);
