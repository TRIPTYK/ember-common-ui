import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, find, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationSelect from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-select', () => {
  function setChangeset(value?: string | object) {
    return new ImmerChangeset<{ names?: string | object }>({ names: value });
  }

  async function renderComponent(
    { env }: { env: VitestTestEnv },
    {
      options = [],
      changeset,
      disabled = false,
    }: {
      options: unknown[];
      changeset: ImmerChangeset;
      disabled?: boolean;
    },
  ) {
    setupTest(env.owner);

    const onChange = () => {};

    await render(
      <template>
        <TpkValidationSelect
          @placeholder="Entrez un nom"
          @label="Names"
          @options={{options}}
          @changeset={{changeset}}
          @validationField="names"
          @disabled={{disabled}}
          @onChange={{onChange}}
          class="custom-class"
        />
      </template>,
    );
  }

  renderingTest(
    'Applies the toString() method for displaying options',
    async ({ env }) => {
      const changeset = setChangeset();
      await renderComponent(
        { env },
        {
          options: [
            {
              toString() {
                return 'toString() method';
              },
            },
          ],
          changeset,
        },
      );
      await click('.ember-power-select-trigger');
      expect(find('.ember-power-select-option')?.textContent?.trim()).toBe(
        'toString() method',
      );
    },
  );

  renderingTest(
    'Applies the direct values from array for displaying options',
    async ({ env }) => {
      const changeset = setChangeset();
      await renderComponent(
        { env },
        {
          options: [
            'Beatport',
            'Spotify',
            'Apple Music',
            'Deezer',
            'Soundcloud',
          ],
          changeset,
        },
      );
      await click('.ember-power-select-trigger');
      expect(find('.ember-power-select-option')?.textContent?.trim()).toBe(
        'Beatport',
      );
    },
  );

  renderingTest(
    'Applies the toString() method for displaying selected element',
    async ({ env }) => {
      const obj = {
        toString() {
          return 'toString() method';
        },
      };
      const changeset = setChangeset(obj);
      await renderComponent({ env }, { options: [obj], changeset });
      await settled();
      expect(
        find('.ember-power-select-selected-item')?.textContent?.trim(),
      ).toBe('toString() method');
    },
  );

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = setChangeset();
      await renderComponent({ env }, { options: [], changeset });
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'names',
      });
      expect(find('.tpk-validation-errors')).toBeTruthy();
      await settled();
      expect(find('.tpk-validation-errors span')?.textContent?.trim()).toBe(
        'required',
      );
    },
  );

  renderingTest(
    'It changes data-has-error attribue on error',
    async ({ env }) => {
      const changeset = setChangeset();
      await renderComponent({ env }, { options: [], changeset });
      expect(
        find('.tpk-select-container')?.getAttribute('data-has-error'),
      ).toBe('false');

      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'names',
      });

      await settled();

      expect(
        find('.tpk-select-container')?.getAttribute('data-has-error'),
      ).toBe('true');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      const changeset = setChangeset();
      await renderComponent({ env }, { options: [], changeset });
      expect(find(`.tpk-select-container`)).toBeTruthy();
      expect(
        find(`.tpk-select-container`)?.hasAttribute(
          `data-test-tpk-prefab-select-container`,
        ),
      ).toBe(true);
      expect(find(`.tpk-select-container .tpk-validation-errors`)).toBeTruthy();
      expect(find(`.tpk-select-container .tpk-label`)).toBeTruthy();
    },
  );

  renderingTest('@disabled disables the select', async ({ env }) => {
    const changeset = setChangeset();
    await renderComponent({ env }, { options: [], changeset, disabled: true });
    expect(
      find(`.ember-basic-dropdown-trigger`)?.getAttribute('aria-disabled'),
    ).toBe('true');
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    const changeset = setChangeset();
    await renderComponent({ env }, { options: [], changeset, disabled: true });
    await a11yAudit();
  });
});
