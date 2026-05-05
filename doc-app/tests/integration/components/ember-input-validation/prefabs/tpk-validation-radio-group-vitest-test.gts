import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationRadioGroup from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio-group';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-prefab-validation-radio-group', () => {
  async function renderComponent(
    { env }: { env: VitestTestEnv },
    { changeset, disabled }: { changeset: ImmerChangeset; disabled?: boolean },
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationRadioGroup
          @changeset={{changeset}}
          @validationField="radio"
          @groupLabel="groupLabel"
          @disabled={{disabled}}
          @mandatory={{true}}
          as |Radio|
        >
          <Radio @value="applati" @label="applati" @selected="applati" />
          <Radio @value="creux" @label="creux" />
        </TpkValidationRadioGroup>
      </template>,
    );

    return changeset;
  }

  renderingTest('CSS classes exists', async ({ env }) => {
    const changeset = new ImmerChangeset({ radio: '' });
    await renderComponent({ env }, { changeset });
    expect(find('.tpk-radio-group-container')).toBeTruthy();
    expect(find('.tpk-radio-group-label')).toBeTruthy();
  });

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = new ImmerChangeset({ radio: undefined });
      changeset.addError({
        message: 'required',
        value: undefined,
        originalValue: undefined,
        key: 'radio',
      });
      await renderComponent({ env }, { changeset });
      expect(
        find('[data-test-tpk-prefab-radio-group-container]')?.getAttribute(
          'data-has-error',
        ),
      ).toBe('true');
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
