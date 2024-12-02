
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationRadio from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio';
import { a11yAudit } from 'ember-a11y-testing/test-support';


module(
  'Integration | Component | Prefabs | tpk-prefab-validation-radio',
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
        <template><TpkValidationRadio @changeset={{changeset}} @validationField="radio" @label="label" @disabled={{disabled}} @mandatory={{true}} @value="radio"/>
        </template>,
      );
      return changeset;
    }

    test('render radio with default structure and with mandatory', async function (assert) {
      const changeset = new ImmerChangeset({
        radio: 'applati',
      });
      await renderComponent({changeset});
      assert.dom('[data-test-tpk-label]').exists();
      assert.dom('[data-test-tpk-label]').exists();
    });

    test('@disabled disables the input', async function(assert) {
      const changeset = new ImmerChangeset({
        radio: 'applati',
      });
      await renderComponent({
        disabled: true,
        changeset
      });
      assert.dom(`[data-test-tpk-prefab-tpk-radio-container] input`).hasAttribute('disabled');
    });

    test('Accessibility', async function (assert) {
      assert.expect(0);
      const changeset = new ImmerChangeset({
        radio: 'applati',
      });
      await renderComponent({changeset});
      await a11yAudit();
    });
  },
);
