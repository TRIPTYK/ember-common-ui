import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationCheckbox from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-checkbox';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';

module(
  'Integration | Component | Prefabs | tpk-validation-checkbox',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(changeset: ImmerChangeset) {
      await render(
        <template>
          <TpkValidationCheckbox
          @changeset={{changeset}}
          @validationField="checkbox"
          @label="label"
          @mandatory={{true}}
          />
        </template>,
      );
    }

    function setupChangeset() {
      return new ImmerChangeset({
        checkbox: true,
      });
    }

    test('renders checkbox with default structure and with mandatory', async function (assert) {
      const changeset = setupChangeset();
      await renderComponent(changeset);
      assert.dom('[data-test-tpk-label]').exists();
      assert.dom('[data-test-tpk-checkbox-input]').exists();
      assert.dom('[data-test-tpk-label]').containsText('label *');
      assert.dom('[data-test-tpk-checkbox-input]').isChecked();
    });

    test('It changes data-has-error attribute on error', async function (assert) {
      const changeset = setupChangeset();
      await renderComponent(changeset);
      await assertDataHasErrorAttribute(assert,changeset,'checkbox');
    });

     test('CSS classes exist and have been attached to the correct element', async function (assert) {
     const changeset = setupChangeset();
      await renderComponent(changeset);
      await assertTpkCssClassesExist(assert,'checkbox');
    });
  },
);
