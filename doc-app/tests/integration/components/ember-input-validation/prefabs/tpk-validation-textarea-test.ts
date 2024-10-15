/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, fill, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';

module(
  'Integration | Component | Prefabs | tpk-validation-textarea',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(this: TestContext) {
      const changeset = new ImmerChangeset({
        name: 'Hellooo',
      });

      this.set('changeset', changeset);

      await render(
        hbs`<Prefabs::TpkValidationTextarea @changeset={{this.changeset}} @validationField="name" @label="label" @mandatory={{true}} />`,
      );

      return changeset;
    }

    test('renders checkbox with default structure and with mandatory', async function (assert) {
      await renderComponent.call(this);
      assert.dom('[data-test-tpk-textarea-label]').exists();
      assert.dom('[data-test-tpk-textarea-input]').exists();
      assert.dom('[data-test-tpk-textarea-label]').containsText('label *');
      assert.dom('[data-test-tpk-textarea-input]').hasValue('Hellooo');
    });
  },
);
