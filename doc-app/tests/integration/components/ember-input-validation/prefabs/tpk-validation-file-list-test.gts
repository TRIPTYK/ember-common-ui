import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationFileList from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file-list';
import { click } from '@ember/test-helpers';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { settled } from '@ember/test-helpers';


module(
  'Integration | Component | Prefabs | tpk-validation-file-list',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    function setupChangeset({
      files = [],
    }: {
      files: File[]
    }) {
      return new ImmerChangeset<{
        files: File[];
      }>({
        files,
      });
    }

    async function renderComponent(params: { changeset: ImmerChangeset; disabled?: boolean; disableDownload?: boolean; }) {
      await render(
        <template>
          <TpkValidationFileList
            @label="label"
            @changeset={{params.changeset}}
            @validationField="files"
            @disableDownload={{params.disableDownload}}
            @disabled={{params.disabled}}
            @placeholder="Glisser-déposer des fichiers images (max 2mb)"
          />
      </template>,
      );
      }


    test('Should show download and delete buttons by default when there are files', async function (assert) {
      const changeset = setupChangeset({
        files: [new File(['Ember Rules!'], 'file.txt')]
      });
      await renderComponent({changeset});
      assert.dom('.tpk-file-list-list-item-action-download').exists();
      assert.dom('.tpk-file-list-list-item-action-delete').exists();
    });

    test('Should hide download and delete buttons when disableDownload is true and disabled', async function (assert) {
      const changeset = setupChangeset({
        files: [new File(['Ember Rules!'], 'file.txt')]
      });
      await renderComponent({changeset, disabled: true, disableDownload: true});
      assert.dom('.tpk-file-list-list-item-action-download').doesNotExist();
      assert.dom('.tpk-file-list-list-item-action-delete').doesNotExist();
    });

    test('Drag and drop files should add them to the changeset and show them in the list', async function (assert) {
      const changeset = setupChangeset({
        files: []
      });
      await renderComponent({ changeset });
      await triggerEvent('.tpk-file-list-placeholder-container', 'drop', {
        dataTransfer: {
          files: [new File(['Ember Rules!'], 'file.txt'), new File(['Ember Rules!'], 'loempia.txt')],
        }
      });
      assert.dom('.tpk-file-list-list-item').exists({ count: 2 });
      assert.strictEqual(changeset.get('files').length, 2);
    });

    test('Drop a file with a default file in changeset should add the file to the changeset and not remove the default file', async function (assert) {
      const changeset = setupChangeset({
        files: [new File(['Ember Rules!'], 'file.txt')]
      });
      await renderComponent({ changeset });
      await triggerEvent('.tpk-file-list-placeholder-container', 'drop', {
        dataTransfer: {
          files: [new File(['Ember Rules!'], 'file.txt')],
        }
      });
      assert.dom('.tpk-file-list-list-item').exists({ count: 2 });
      assert.strictEqual(changeset.get('files').length, 2);
    });

    test('Delete button should remove the file from the changeset', async function (assert) {
      const changeset = setupChangeset({
        files: [new File(['Ember Rules!'], 'file.txt')]
      });
      await renderComponent({ changeset });
      await click('.tpk-file-list-list-item:first-child .tpk-file-list-list-item-action-delete');
      assert.dom('.tpk-file-list-list-item').doesNotExist();
      assert.strictEqual(changeset.get('files').length, 0);
    });

    test('It changes data-has-error attribue on error', async function (assert) {
      const changeset = setupChangeset({
        files: []
      });
      await renderComponent({changeset});

      changeset.addError({
        message: 'required',
        value: '',
        originalValue: '',
        key: 'files',
      });

      await settled();
      assert.dom(`[data-test-tpk-file-list-input]`).hasNoText();

      assert
        .dom(`[data-test-tpk-prefab-file-list-container]`)
        .hasAttribute('data-has-error', 'true');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      const changeset = setupChangeset({
        files: []
      });
      await renderComponent({changeset});
      await assertTpkCssClassesExist(assert,'file-list');
    });

    test('Accessibility', async function (assert) {
      assert.expect(0);
      const changeset = setupChangeset({
        files: []
      });
      await renderComponent({changeset});
      await a11yAudit();
    });
  },
);
