import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, render } from '@ember/test-helpers';
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

    async function renderComponent(this: ThisTestContext) {
      const changeset = new ImmerChangeset({
        name: 'value',
      });

      await render<ThisTestContext>(
        <template>
        <TpkValidationInputPrefabComponent @changeset={{changeset}} @validationField="name" @label="label" @mandatory={{true}} />
        </template>
      );

      return changeset;
    }

    test('renders input with default structure and with mandatory', async function (this: ThisTestContext, assert) {
      await renderComponent.call(this);
      assert.dom('[data-test-tpk-label]').exists();
      assert.dom('[data-test-tpk-input-input]').exists();
      assert.dom('[data-test-tpk-label]').containsText('label *');
      assert.dom('[data-test-tpk-input-input]').hasValue('value');
    });
  },
);
