import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import {
  click,
  find,
  findAll,
  render,
  settled,
  triggerEvent,
} from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationFileList from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file-list';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-file-list', () => {
  function setupChangeset({ files = [] }: { files: File[] }) {
    return new ImmerChangeset<{ files: File[] }>({ files });
  }

  async function renderComponent(
    { env }: { env: VitestTestEnv },
    params: {
      changeset: ImmerChangeset;
      disabled?: boolean;
      disableDownload?: boolean;
    },
  ) {
    setupTest(env.owner);

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

  renderingTest(
    'Should show download and delete buttons by default when there are files',
    async ({ env }) => {
      const changeset = setupChangeset({
        files: [new File(['Ember Rules!'], 'file.txt')],
      });
      await renderComponent({ env }, { changeset });
      expect(find('.tpk-file-list-list-item-action-download')).toBeTruthy();
      expect(find('.tpk-file-list-list-item-action-delete')).toBeTruthy();
    },
  );

  renderingTest(
    'Should hide download and delete buttons when disableDownload is true and disabled',
    async ({ env }) => {
      const changeset = setupChangeset({
        files: [new File(['Ember Rules!'], 'file.txt')],
      });
      await renderComponent(
        { env },
        { changeset, disabled: true, disableDownload: true },
      );
      expect(find('.tpk-file-list-list-item-action-download')).toBeNull();
      expect(find('.tpk-file-list-list-item-action-delete')).toBeNull();
    },
  );

  renderingTest(
    'Drag and drop files should add them to the changeset and show them in the list',
    async ({ env }) => {
      const changeset = setupChangeset({ files: [] });
      await renderComponent({ env }, { changeset });
      await triggerEvent('.tpk-file-list-placeholder-container', 'drop', {
        dataTransfer: {
          files: [
            new File(['Ember Rules!'], 'file.txt'),
            new File(['Ember Rules!'], 'loempia.txt'),
          ],
        },
      });
      expect(findAll('.tpk-file-list-list-item').length).toBe(2);
      expect(changeset.get('files').length).toBe(2);
    },
  );

  renderingTest(
    'Drop a file with a default file in changeset should add the file to the changeset and not remove the default file',
    async ({ env }) => {
      const changeset = setupChangeset({
        files: [new File(['Ember Rules!'], 'file.txt')],
      });
      await renderComponent({ env }, { changeset });
      await triggerEvent('.tpk-file-list-placeholder-container', 'drop', {
        dataTransfer: {
          files: [new File(['Ember Rules!'], 'file.txt')],
        },
      });
      expect(findAll('.tpk-file-list-list-item').length).toBe(2);
      expect(changeset.get('files').length).toBe(2);
    },
  );

  renderingTest(
    'Delete button should remove the file from the changeset',
    async ({ env }) => {
      const changeset = setupChangeset({
        files: [new File(['Ember Rules!'], 'file.txt')],
      });
      await renderComponent({ env }, { changeset });
      await click(
        '.tpk-file-list-list-item:first-child .tpk-file-list-list-item-action-delete',
      );
      expect(find('.tpk-file-list-list-item')).toBeNull();
      expect(changeset.get('files').length).toBe(0);
    },
  );

  renderingTest(
    'It changes data-has-error attribue on error',
    async ({ env }) => {
      const changeset = setupChangeset({ files: [] });
      await renderComponent({ env }, { changeset });

      changeset.addError({
        message: 'required',
        value: '',
        originalValue: '',
        key: 'files',
      });

      await settled();
      expect(
        find('[data-test-tpk-file-list-input]')?.textContent?.trim() || '',
      ).toBe('');
      expect(
        find('[data-test-tpk-prefab-file-list-container]')?.getAttribute(
          'data-has-error',
        ),
      ).toBe('true');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      const changeset = setupChangeset({ files: [] });
      await renderComponent({ env }, { changeset });
      assertTpkCssClassesExist('file-list');
    },
  );

  renderingTest.skip('Accessibility', async ({ env }) => {
    const changeset = setupChangeset({ files: [] });
    await renderComponent({ env }, { changeset });
    await a11yAudit();
  });
});
