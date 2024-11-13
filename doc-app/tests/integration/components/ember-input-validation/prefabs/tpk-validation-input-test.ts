import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';

module(
  'Integration | Component | Prefabs | tpk-validation-input',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(this: TestContext) {
      const changeset = new ImmerChangeset({
        name: 'value',
      });

      this.set('changeset', changeset);

      await render(
        hbs`<Prefabs::TpkValidationInput @changeset={{this.changeset}} @validationField="name" @label="label" @mandatory={{true}} />`,
      );

      return changeset;
    }

    test('renders input with default structure and with mandatory', async function (assert) {
      await renderComponent.call(this);
      assert.dom('[data-test-tpk-label]').exists();
      assert.dom('[data-test-tpk-input-input]').exists();
      assert.dom('[data-test-tpk-label]').containsText('label *');
      assert.dom('[data-test-tpk-input-input]').hasValue('value');
    });
  },
);
