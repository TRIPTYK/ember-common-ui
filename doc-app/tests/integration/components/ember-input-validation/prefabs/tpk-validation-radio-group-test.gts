import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationRadioGroup from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio-group';
import { a11yAudit } from 'ember-a11y-testing/test-support';



module(
  'Integration | Component | Prefabs | tpk-prefab-validation-radio-group',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent({
      changeset,
      disabled
    }: {
      changeset: ImmerChangeset,
      disabled?: boolean,
    }) {
      await render(
        <template><TpkValidationRadioGroup
        @changeset={{changeset}}
        @validationField="radio"
        @groupLabel="groupLabel"
        @disabled={{disabled}}
        @mandatory={{true}}

        as |Radio|>
        <Radio @value="applati" @label="applati" @selected="applati" />
        <Radio @value="creux" @label="creux" />
      </TpkValidationRadioGroup>
      </template>,
      );
      return changeset;
    }
    test('CSS classes exists', async function (assert) {
      const changeset = new ImmerChangeset({
        radio: '',
      });
      await renderComponent({changeset});
      assert.dom('.tpk-radio-group-container').exists();
      assert.dom('.tpk-radio-group-label').exists();
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
      await renderComponent({changeset});
      assert
        .dom('[data-test-tpk-prefab-radio-group-container]')
        .hasAttribute('data-has-error', 'true');
    });

    test('@disabled disables the input', async function(assert) {
      const changeset = new ImmerChangeset({
        radio: 'applati',
      });
      await renderComponent({
        disabled: true,
        changeset
      });
      assert.dom(`[data-test-tpk-prefab-radio-container] input`).hasAttribute('disabled');
    });

    test('Accessibility', async function (assert) {
      assert.expect(0);
      const changeset = new ImmerChangeset({
        radio: 'applati',
      });
      await renderComponent( {changeset});
      await a11yAudit();
    })
  },
);
