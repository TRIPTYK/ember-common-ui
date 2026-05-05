import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, find, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { selectSearch } from 'ember-power-select/test-support';
import TpkValidationSelectSearch from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-search';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

const options = [
  {
    label: 'McDonald',
    value: 'Burger',
    toString() {
      return `${this.label} - ${this.value}`;
    },
  },
  {
    label: 'Tournai Grill',
    value: 'Pitta',
    toString() {
      return `${this.label} - ${this.value}`;
    },
  },
  {
    label: 'California Dream',
    value: 'Sushi',
    toString() {
      return `${this.label} - ${this.value}`;
    },
  },
] as const;

describe('Integration | Component | Prefabs | tpk-validation-select-search', () => {
  async function renderComponent(
    { env }: { env: VitestTestEnv },
    params: { changeset: ImmerChangeset; disabled?: boolean },
    onSearch?: () => unknown[],
  ) {
    setupTest(env.owner);

    const onChange = (selection: unknown) => {
      params.changeset.set('fastfood', selection);
    };

    const search = onSearch ?? (() => [] as unknown[]);
    const emptyOptions: unknown[] = [];

    await render(
      <template>
        <TpkValidationSelectSearch
          @changeset={{params.changeset}}
          @onSearch={{search}}
          @onChange={{onChange}}
          @options={{emptyOptions}}
          @disabled={{params.disabled}}
          @validationField="fastfood"
          @label="Select your favorite fastfood"
        />
      </template>,
    );
  }

  renderingTest(
    'Should show default value and no options in starting',
    async ({ env }) => {
      const changeset = new ImmerChangeset({ fastfood: options[0].toString() });
      await renderComponent({ env }, { changeset });
      expect(
        find('.ember-power-select-selected-item')?.textContent?.trim(),
      ).toBe('McDonald - Burger');
    },
  );

  renderingTest(
    'Should use search select features by default',
    async ({ env }) => {
      const changeset = new ImmerChangeset({ fastfood: options[0].toString() });
      const search = vi.fn().mockReturnValue([]);
      await renderComponent({ env }, { changeset }, search);
      await click('.ember-power-select-trigger');
      expect(
        find('.ember-power-select-option--search-message')?.textContent?.trim(),
      ).toBe('Type to search');
      expect(
        find('.ember-power-select-selected-item')?.textContent?.trim(),
      ).toBe('McDonald - Burger');
      await selectSearch(
        '.tpk-select-search-container .ember-power-select-search input',
        'new',
      );
      expect(search).toHaveBeenCalledOnce();
    },
  );

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = new ImmerChangeset({ fastfood: options[0].toString() });
      await renderComponent({ env }, { changeset });
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'fastfood',
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
      const changeset = new ImmerChangeset({ fastfood: options[0].toString() });
      await renderComponent({ env }, { changeset });
      expect(find(`.tpk-select-search-container`)).toBeTruthy();
      expect(
        find(`.tpk-select-search-container`)?.hasAttribute(
          `data-test-tpk-prefab-select-search-container`,
        ),
      ).toBe(true);
      expect(
        find(`.tpk-select-search-container .tpk-validation-errors`),
      ).toBeTruthy();
      expect(find(`.tpk-select-search-container .tpk-label`)).toBeTruthy();
    },
  );

  renderingTest('@disabled disables the select', async ({ env }) => {
    const changeset = new ImmerChangeset({ fastfood: options[0].toString() });
    await renderComponent({ env }, { changeset, disabled: true });
    expect(
      find(`.ember-basic-dropdown-trigger`)?.getAttribute('aria-disabled'),
    ).toBe('true');
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    const changeset = new ImmerChangeset({ fastfood: options[0].toString() });
    await renderComponent({ env }, { changeset });
    await a11yAudit();
  });
});
