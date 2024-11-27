import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationInputPrefabComponent from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';
import { cssClassesExist } from '../generic-test-functions/css-classes-exist';
import { dataHasErrorAttribute } from '../generic-test-functions/data-has-error-attribute';

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
      await dataHasErrorAttribute(assert,changeset,'input');
    });

    test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
     const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      await cssClassesExist(assert,'input');
    });
  },
);
