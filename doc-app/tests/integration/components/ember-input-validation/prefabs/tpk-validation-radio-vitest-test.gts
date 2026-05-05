import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationRadio from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-prefab-validation-radio', () => {
  async function renderComponent(
    { env }: { env: VitestTestEnv },
    { changeset, disabled }: { changeset: ImmerChangeset; disabled?: boolean },
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationRadio
          @changeset={{changeset}}
          @validationField="radio"
          @label="label"
          @disabled={{disabled}}
          @mandatory={{true}}
          @value="radio"
        />
      </template>,
    );

    return changeset;
  }

  renderingTest(
    'render radio with default structure and with mandatory',
    async ({ env }) => {
      const changeset = new ImmerChangeset({ radio: 'applati' });
      await renderComponent({ env }, { changeset });
      expect(find('[data-test-tpk-label]')).toBeTruthy();
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    const changeset = new ImmerChangeset({ radio: 'applati' });
    await renderComponent({ env }, { disabled: true, changeset });
    expect(
      find('[data-test-tpk-prefab-radio-container] input')?.hasAttribute(
        'disabled',
      ),
    ).toBe(true);
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    const changeset = new ImmerChangeset({ radio: 'applati' });
    await renderComponent({ env }, { changeset });
    await a11yAudit();
  });
});
