import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationInputPrefabComponent from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';


module(
  'Integration | Component | Prefabs | tpk-validation-input',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    function setupChangeset() {
      return new ImmerChangeset({
        input: 'value',
      });
    }

    async function renderComponent(params: { changeset: ImmerChangeset, disabled?: boolean }) {
      await render(
      <template>
      <TpkValidationInputPrefabComponent
        @changeset={{params.changeset}}
        @validationField="input"
        @label="label"
        @mandatory={{true}}
        @disabled={{params.disabled}}
      />
      </template>
      );
    }

    test('renders input with default structure and with mandatory', async function ( assert) {
     const changeset = setupChangeset();
      await renderComponent({changeset});
      assert.dom('[data-test-tpk-label]').exists();
      assert.dom('[data-test-tpk-input-input]').exists();
      assert.dom('[data-test-tpk-label]').containsText('label *');
      assert.dom('[data-test-tpk-input-input]').hasValue('value');
    });

    test('It changes data-has-error attribute on error', async function (assert) {
      const changeset = setupChangeset();
      await renderComponent({changeset});
      await assertDataHasErrorAttribute(assert,changeset,'input');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
     const changeset = setupChangeset();
      await renderComponent({changeset});
      await assertTpkCssClassesExist(assert,'input');
    });

    test('@disabled disables the input', async function(assert) {
      const changeset = setupChangeset();
      await renderComponent({
        disabled: true,
        changeset
      });
      assert.dom(`[data-test-tpk-input-input]`).hasAttribute('disabled');
    });
  },
);
