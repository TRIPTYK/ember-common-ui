/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';

module(
  'Integration | Component | Prefabs | tpk-prefab-validation-radio',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(
      this: TestContext,
      changeset: ImmerChangeset,
    ) {
      this.set('changeset', changeset);
      await render(
        hbs`<Prefabs::TpkValidationRadio @changeset={{this.changeset}} @validationField="radio" @label="label" @mandatory={{true}} @value="radio"/>
        `,
      );
      return changeset;
    }

    test('render radio with default structure and with mandatory', async function (assert) {
      const changeset = new ImmerChangeset({
        radio: 'applati',
      });
      await renderComponent.call(this, changeset);
      assert.dom('[data-test-tpk-label]').exists();
      assert.dom('[data-test-tpk-radio]').exists();
      assert.dom('[data-test-tpk-label]').exists();
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = new ImmerChangeset({
        radio: undefined,
      });
      changeset.addError({
        message: 'required',
        value: undefined,
        originalValue: undefined,
        key: 'radio',
      });
      await renderComponent.call(this, changeset);
      this.set('changeset', changeset);
      assert
        .dom('[data-test-tpk-radio]')
        .hasAttribute('data-has-error', 'true');
    });
  },
);
