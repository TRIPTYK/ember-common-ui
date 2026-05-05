import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { find, render, triggerEvent } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationFile from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-file', () => {
  function setupChangeset() {
    return new ImmerChangeset<{ file: File | undefined }>({ file: undefined });
  }

  async function renderComponent(
    { env }: { env: VitestTestEnv },
    params: { changeset: ImmerChangeset; disabled?: boolean },
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationFile
          @label="label"
          @changeset={{params.changeset}}
          @validationField="file"
          @disabled={{params.disabled}}
        />
      </template>,
    );
  }

  renderingTest(
    'It changes data-has-error attribue on error',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, { changeset });

      await assertDataHasErrorAttribute(changeset, 'file');

      await triggerEvent('[data-test-tpk-file-input]', 'change', {
        files: [new File(['Ember Rules!'], 'file.txt')],
      });
      expect(changeset.get('file') instanceof File).toBe(true);
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, { changeset });
      assertTpkCssClassesExist('file');
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent({ env }, { changeset, disabled: true });
    expect(find('[data-test-tpk-file-input]')?.hasAttribute('disabled')).toBe(
      true,
    );
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    await renderComponent(
      { env },
      { changeset: setupChangeset(), disabled: false },
    );
    await a11yAudit();
  });
});
