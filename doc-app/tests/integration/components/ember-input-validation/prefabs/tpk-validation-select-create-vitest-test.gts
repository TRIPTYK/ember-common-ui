import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationSelectCreate from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-create';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-select-create', () => {
  async function renderComponent(
    { env }: { env: VitestTestEnv },
    params?: { disabled: boolean },
  ) {
    setupTest(env.owner);

    const changeset = new ImmerChangeset<{ name: string | undefined }>({
      name: undefined,
    });
    const options = ['Romain', 'Gilles', 'Amaury'];

    const onCreate = (term: unknown) => {
      changeset.set('name', term as string);
      options.push(term as string);
    };

    const onChange = () => {};

    const buildSuggestions = (term: string) => {
      return `Créer "${term}"...`;
    };

    const showCreateWhen = (term: string) => {
      const existingOption = options.find((name) => name === term);
      return !existingOption;
    };

    await render(
      <template>
        <TpkValidationSelectCreate
          @placeholder="Entrez un nom"
          @label="Patron de Triptyk"
          @options={{options}}
          @changeset={{changeset}}
          @buildSuggestion={{buildSuggestions}}
          @showCreateWhen={{showCreateWhen}}
          @disabled={{params.disabled}}
          @onChange={{onChange}}
          @onCreate={{onCreate}}
          @validationField="name"
          class="custom-class"
        />
      </template>,
    );

    return changeset;
  }

  renderingTest(
    'Applies the toString() method for displaying options',
    async ({ env }) => {
      await renderComponent({ env });
      await click('.ember-power-select-trigger');
      expect(
        find('.ember-power-select-option:first-child')?.textContent?.trim(),
      ).toBe('Romain');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      await renderComponent({ env });
      expect(find(`.tpk-select-create-container`)).toBeTruthy();
      expect(
        find(`.tpk-select-create-container`)?.hasAttribute(
          `data-test-tpk-prefab-select-create-container`,
        ),
      ).toBe(true);
      expect(
        find(`.tpk-select-create-container .tpk-validation-errors`),
      ).toBeTruthy();
      expect(
        find(`.tpk-select-create-container .tpk-select-create-label`),
      ).toBeTruthy();
    },
  );

  renderingTest('@disabled disables the select', async ({ env }) => {
    await renderComponent({ env }, { disabled: true });
    expect(
      find(`.ember-basic-dropdown-trigger`)?.getAttribute('aria-disabled'),
    ).toBe('true');
  });

  // TODO: Got an error on accessibility... but cannot change it because it depends of power-select-with-create
  // renderingTest.skip('Accessibility', async ({ env }) => { ... });
});
