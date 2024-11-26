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

    test('It changes data-has-error attribue on error', async function (assert) {
      const changeset = new ImmerChangeset<{
        file: File | undefined;
      }>({
        file: undefined,
      });

      await render<ThisTestContext>(
        <template><TpkValidationFile @label="label" @changeset={{changeset}} @validationField="file" />
      </template>,
      );
      assert.dom('[data-test-tpk-file]').exists();
      assert.dom('[data-test-tpk-label]').containsText('label');

      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'file',
      });
      await settled();

      assert.dom('[data-test-tpk-file]').hasAttribute('data-has-error', 'true');

      await triggerEvent('[data-test-tpk-file-input]', 'change', {
        files: [new File(['Ember Rules!'], 'file.txt')],
      });
      assert.true(changeset.get('file') instanceof File);
    });
  },
);
