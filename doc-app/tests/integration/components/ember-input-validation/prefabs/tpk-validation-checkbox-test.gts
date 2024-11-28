import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationCheckbox from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-checkbox';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module(
  'Integration | Component | Prefabs | tpk-validation-checkbox',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(changeset: ImmerChangeset) {
      await render<ThisTestContext>(
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

    function setupChangeset(this: ThisTestContext) {
      return new ImmerChangeset({
        checkbox: true,
      });
    }

    test('renders checkbox with default structure and with mandatory', async function (this: ThisTestContext, assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      assert.dom('[data-test-tpk-label]').exists();
      assert.dom('[data-test-tpk-checkbox-input]').exists();
      assert.dom('[data-test-tpk-label]').containsText('label *');
      assert.dom('[data-test-tpk-checkbox-input]').isChecked();
    });

    test('It changes data-has-error attribute on error', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      await assertDataHasErrorAttribute(assert,changeset,'checkbox');
    });

     test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
     const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      await assertTpkCssClassesExist(assert,'checkbox');
    });
  },
);
