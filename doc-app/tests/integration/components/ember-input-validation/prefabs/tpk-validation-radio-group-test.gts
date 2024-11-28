import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationRadioGroup from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio-group';



module(
  'Integration | Component | Prefabs | tpk-prefab-validation-radio-group',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(

      changeset: ImmerChangeset,
    ) {
      await render(
        <template><TpkValidationRadioGroup
        @changeset={{changeset}}
        @validationField="radio"
        @groupLabel="groupLabel"
        @mandatory={{true}}

        as |Radio|>
        <Radio @value="applati" @label="applati" @selected="applati" />
        <Radio @value="creux" @label="creux" />
      </TpkValidationRadioGroup>
      </template>,
      );
      return changeset;
    }
    test('render radio with default structure and with mandatory', async function (assert) {
      const changeset = new ImmerChangeset({
        radio: '',
      });
      await renderComponent( changeset);
      assert.dom('[data-test-tpk-radio-group-label]').exists();
      assert.dom('[data-test-tpk-radio-input]').exists();
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
      await renderComponent( changeset);
      assert
        .dom('[data-test-prefab-radio-group]')
        .hasAttribute('data-has-error', 'true');
    });
  },
);
