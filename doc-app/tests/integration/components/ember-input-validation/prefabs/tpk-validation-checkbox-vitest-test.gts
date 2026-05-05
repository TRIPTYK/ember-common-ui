import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationCheckbox from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-checkbox';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-checkbox', () => {
  function setupChangeset() {
    return new ImmerChangeset({ checkbox: true });
  }

  async function renderComponent(
    { env }: { env: VitestTestEnv },
    changeset: ImmerChangeset,
    params?: { disabled?: boolean },
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationCheckbox
          @changeset={{changeset}}
          @validationField="checkbox"
          @label="label"
          @mandatory={{true}}
          @disabled={{params.disabled}}
        />
      </template>,
    );
  }

  renderingTest(
    'renders checkbox with default structure and with mandatory',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, changeset);
      expect(find('[data-test-tpk-label]')).toBeTruthy();
      expect(find('[data-test-tpk-checkbox-input]')).toBeTruthy();
      expect(
        find('[data-test-tpk-label]')?.textContent?.trim().replace(/\s+/g, ' '),
      ).toContain('label *');
    },
  );

  renderingTest(
    'It changes data-has-error attribute on error',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, changeset);
      await assertDataHasErrorAttribute(changeset, 'checkbox');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, changeset);
      assertTpkCssClassesExist('checkbox');
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent({ env }, changeset, { disabled: true });
    expect(
      find('[data-test-tpk-checkbox-input]')?.hasAttribute('disabled'),
    ).toBe(true);
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent({ env }, changeset, { disabled: false });
    await a11yAudit();
  });
});
