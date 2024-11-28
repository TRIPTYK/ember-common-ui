import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationFile from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';


module(
  'Integration | Component | Prefabs | tpk-validation-file',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    function setupChangeset() {
      return new ImmerChangeset<{
        file: File | undefined;
      }>({
        file: undefined,
      });
    }

    async function renderComponent(changeset:ImmerChangeset) {
        await render(
          <template><TpkValidationFile @label="label" @changeset={{changeset}} @validationField="file" />
        </template>,
        );

      }


    test('It changes data-has-error attribue on error', async function (assert) {
      const changeset = setupChangeset();
      await renderComponent(changeset);

      await assertDataHasErrorAttribute(assert,changeset,'file');

      await triggerEvent('[data-test-tpk-file-input]', 'change', {
        files: [new File(['Ember Rules!'], 'file.txt')],
      });
      assert.true(changeset.get('file') instanceof File);
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      const changeset = setupChangeset();
      await renderComponent(changeset);
      await assertTpkCssClassesExist(assert,'file');
    });
  },
);
