import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, fill, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';

module(
  'Integration | Component | Prefabs | tpk-prefab-validation-radio-group',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(
      this: TestContext,
      changeset: ImmerChangeset,
    ) {
      this.set('changeset', changeset);
      await render(
        hbs`<Prefabs::TpkValidationRadioGroup 
        @changeset={{this.changeset}} 
        @validationField="radio" 
        @groupLabel="groupLabel"
        @mandatory={{true}}
        as |V|>
        <V.Radio @value="applati" @label="applati" />
        <V.Radio @value="creux" @label="creux" />
      </Prefabs::TpkValidationRadioGroup>
      `,
      );
      return changeset;
    }
    test('render radio with default structure and with mandatory', async function (assert) {
      const changeset = new ImmerChangeset({
        radio: '',
      });
      await renderComponent.call(this, changeset);
      await this.pauseTest()
      assert.dom('[data-test-tpk-radio-group-label]').exists();
      assert.dom('[data-test-tpk-radio-group]').exists();
      assert.dom('[data-test-tpk-radio-group-input]').exists();
    });
  },
);
