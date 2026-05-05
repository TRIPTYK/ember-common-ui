import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { fillIn, find, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationNumber from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-number';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-number', () => {
  function setupChangeset() {
    return new ImmerChangeset({ number: 0 });
  }

  async function renderComponent(
    { env }: { env: VitestTestEnv },
    changeset: ImmerChangeset,
    params?: { disabled?: boolean },
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationNumber
          @changeset={{changeset}}
          @validationField="number"
          @disabled={{params.disabled}}
          @label="Number validation field"
          class="custom-number-class"
          @step={{0.1}}
        />
      </template>,
    );
  }

  async function renderComponentUnsigned(
    { env }: { env: VitestTestEnv },
    changeset: ImmerChangeset,
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationNumber
          @changeset={{changeset}}
          @validationField="number"
          @label="Number validation field"
          class="custom-number-class"
          @unsigned={{true}}
          @step={{0.1}}
        />
      </template>,
    );
  }

  renderingTest('Input type must be a number', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent({ env }, changeset);
    await fillIn('input', '2.1');
    expect(find('input')?.getAttribute('type')).toBe('number');
    expect(changeset.get('number')).toBe(2.1);
    await fillIn('input', 'jacques');
    expect(changeset.get('number')).toBeFalsy();
  });

  renderingTest(
    'Attributes should be passed to the container',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, changeset);
      expect(
        find('[data-test-tpk-prefab-number-container]')?.classList.contains(
          'custom-number-class',
        ),
      ).toBe(true);
    },
  );

  renderingTest('it passes unsigned number', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponentUnsigned({ env }, changeset);
    await fillIn('input', '0.1');
    const input = find('input') as HTMLInputElement;
    expect(changeset.get('number')).toBe(0.1);
    input?.stepDown();
    input?.stepDown();
    expect((find('input') as HTMLInputElement)?.value).toBe('0');
  });

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponentUnsigned({ env }, changeset);
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'number',
      });
      expect(find('.tpk-validation-errors')).toBeTruthy();
      await settled();
      expect(find('.tpk-validation-errors span')?.textContent?.trim()).toBe(
        'required',
      );
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, changeset);
      assertTpkCssClassesExist('number');
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent({ env }, changeset, { disabled: true });
    expect(find('[data-test-tpk-number-input]')?.hasAttribute('disabled')).toBe(
      true,
    );
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent({ env }, changeset);
    await a11yAudit();
  });
});
