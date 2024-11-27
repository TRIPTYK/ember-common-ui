import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerEvent, type TestContext } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationFile from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module(
  'Integration | Component | Prefabs | tpk-validation-file',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    function setupChangeset(this: ThisTestContext) {
      return new ImmerChangeset<{
        file: File | undefined;
      }>({
        file: undefined,
      });
    }

    async function renderComponent(changeset:ImmerChangeset) {
        await render<ThisTestContext>(
          <template><TpkValidationFile @label="label" @changeset={{changeset}} @validationField="file" />
        </template>,
        );
        
      }
    

    test('It changes data-has-error attribue on error', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this);

     await renderComponent(changeset);

      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'file',
      });
      await settled();
      assert.dom('[data-test-tpk-label]').containsText('label');
      assert.dom('[data-test-tpk-prefab-file-container]').hasAttribute('data-has-error', 'true');

      await triggerEvent('[data-test-tpk-file-input]', 'change', {
        files: [new File(['Ember Rules!'], 'file.txt')],
      });
      assert.true(changeset.get('file') instanceof File);
    });

    test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      assert.dom('.tpk-file-container').exists().hasAttribute('data-test-tpk-prefab-file-container');
      assert.dom('.tpk-file-container .tpk-file-input').exists()
      assert.dom('.tpk-file-container .tpk-validation-errors').exists()
      assert.dom('.tpk-file-container .tpk-label').exists()
      assert.dom('label').hasClass('tpk-file-container');
      assert.dom('input').hasClass('tpk-file-input');
      assert.dom('label > div:first-of-type').hasClass('tpk-label', 'The first div inside label has the class tpk-label.');
      assert.dom('label > div:nth-of-type(2)').hasClass('tpk-validation-errors', 'The second div inside label has the class tpk-validation-errors.');
    });
  },
);
