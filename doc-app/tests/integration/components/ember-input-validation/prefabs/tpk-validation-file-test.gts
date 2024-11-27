import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, type TestContext } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationFile from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file';
import { cssClassesExist } from '../generic-test-functions/css-classes-exist';
import { dataHasErrorAttribute } from '../generic-test-functions/data-has-error-attribute';

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

      await dataHasErrorAttribute(assert,changeset,'file');

      await triggerEvent('[data-test-tpk-file-input]', 'change', {
        files: [new File(['Ember Rules!'], 'file.txt')],
      });
      assert.true(changeset.get('file') instanceof File);
    });

    test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this);
      await renderComponent(changeset);
      await cssClassesExist(assert,'file');
    });
  },
);
