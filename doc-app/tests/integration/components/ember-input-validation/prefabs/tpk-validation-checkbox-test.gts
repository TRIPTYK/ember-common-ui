import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, settled, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationCheckbox from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-checkbox';

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

      changeset.addError({
        message: 'required',
        value: '',
        originalValue: '',
        key: 'checkbox',
      });
      await settled();
      assert.dom('[data-test-tpk-checkbox-input]').hasNoText();
      assert
        .dom('[data-test-tpk-checkbox]')
        .hasAttribute('data-has-error', 'true');
    });

     test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
     const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      assert.dom('.tpk-checkbox-container').exists().hasAttribute('data-test-tpk-checkbox');
      assert.dom('.tpk-checkbox-container .tpk-checkbox-input').exists()
      assert.dom('.tpk-checkbox-container .tpk-validation-errors').exists()
      assert.dom('.tpk-checkbox-container .tpk-label').exists()
      assert.dom('label').hasClass('tpk-checkbox-container');
      assert.dom('input').hasClass('tpk-checkbox-input');
      assert.dom('label > div:first-of-type').hasClass('tpk-label', 'The first div inside label has the class tpk-label.');
      assert.dom('label > div:nth-of-type(2)').hasClass('tpk-validation-errors', 'The second div inside label has the class tpk-validation-errors.');
    });
  },
);
