import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, fillIn, find, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { selectChoose } from 'ember-power-select/test-support';
import TpkValidationMobile from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-mobile';
import TpkValidationInput from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-mobile', () => {
  function setChangeset(
    phoneValue = '+33712345678',
    overrides: Record<string, unknown> = {},
  ) {
    return new ImmerChangeset({ phone: phoneValue, ...overrides });
  }

  async function renderComponent(
    env: VitestTestEnv,
    {
      changeset,
      disabled = false,
    }: { changeset: ImmerChangeset; disabled?: boolean },
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationMobile
          @changeset={{changeset}}
          @validationField="phone"
          @label="Numéro de téléphone"
          @disabled={{disabled}}
        />
      </template>,
    );
  }

  async function renderComponentWithOtherInput(
    env: VitestTestEnv,
    changeset: ImmerChangeset,
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationMobile
          @changeset={{changeset}}
          @validationField="phone"
          @label="Numéro de téléphone"
        />
        <TpkValidationInput
          class="text-element"
          @changeset={{changeset}}
          @validationField="text"
          @label="Texte"
        />
      </template>,
    );
  }

  renderingTest(
    'Should split country prefixe and phone number and show label',
    async ({ env }) => {
      const changeset = setChangeset();
      await renderComponent(env, { changeset });
      expect(find('.ember-power-select-selected-item')?.textContent).toContain(
        '+33',
      );
      expect((find('input') as HTMLInputElement)?.value).toBe('7 12 34 56 78');
    },
  );

  renderingTest(
    'When change country prefixe should adapt mask',
    async ({ env }) => {
      const changeset = setChangeset();
      await renderComponent(env, { changeset });
      expect((find('input') as HTMLInputElement)?.value).toBe('7 12 34 56 78');
      await selectChoose('.ember-power-select-trigger', '+32');
      expect((find('input') as HTMLInputElement)?.value).toBe('712 34 56 78');
    },
  );

  renderingTest(
    'Show default prefixe when phone number is empty',
    async ({ env }) => {
      const changeset = setChangeset('');
      await renderComponent(env, { changeset });
      expect(find('.ember-power-select-selected-item')?.textContent).toContain(
        '+32',
      );
      expect((find('input') as HTMLInputElement)?.value).toBe('');
    },
  );

  renderingTest(
    'Show default prefixe when phone number is not well formatted and show first number of phone number in input',
    async ({ env }) => {
      const changeset = setChangeset('00345333443434');
      await renderComponent(env, { changeset });
      expect(find('.ember-power-select-selected-item')?.textContent).toContain(
        '+32',
      );
      expect((find('input') as HTMLInputElement)?.value).toBe('003 45 33 34');
    },
  );

  renderingTest(
    'When change value for prefixe and phone number, changeset value should combine values',
    async ({ env }) => {
      const changeset = setChangeset('');
      await renderComponent(env, { changeset });
      await selectChoose('.ember-power-select-trigger', '+352');
      await fillIn('input', '123456789');
      await click(document.body);
      expect(find('.ember-power-select-selected-item')?.textContent).toContain(
        '+352',
      );
      expect((find('input') as HTMLInputElement)?.value).toBe('123 456 789');
      expect(changeset.get('phone')).toBe('+352123456789');
    },
  );

  renderingTest(
    'When change value for an another input, mask input for mobile is not reset',
    async ({ env }) => {
      const changeset = setChangeset('', { text: '123' });
      await renderComponentWithOtherInput(env, changeset);
      await selectChoose('.ember-power-select-trigger', '+352');
      await fillIn('.tpk-mobile-input', '123456789');
      await click(document.body);
      expect(find('.ember-power-select-selected-item')?.textContent).toContain(
        '+352',
      );
      expect((find('.tpk-mobile-input') as HTMLInputElement)?.value).toBe(
        '123 456 789',
      );
      await fillIn('.text-element input', '456');
      expect((find('.tpk-mobile-input') as HTMLInputElement)?.value).toBe(
        '123 456 789',
      );
      expect(changeset.get('phone')).toBe('+352123456789');
    },
  );

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = setChangeset('');
      await renderComponent(env, { changeset });
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'phone',
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
      const changeset = setChangeset('');
      await renderComponent(env, { disabled: false, changeset });
      expect(find(`.tpk-mobile-container`)).toBeTruthy();
      expect(
        find(`.tpk-mobile-container`)?.hasAttribute(
          `data-test-tpk-prefab-mobile-container`,
        ),
      ).toBe(true);
      expect(find(`.tpk-mobile-container .tpk-mobile-content`)).toBeTruthy();
      expect(find(`.tpk-mobile-container .tpk-mobile-input`)).toBeTruthy();
      expect(find(`.tpk-mobile-container .tpk-validation-errors`)).toBeTruthy();
      expect(find(`.tpk-mobile-container .tpk-label`)).toBeTruthy();
      expect(
        find(`label`)?.classList.contains(`tpk-mobile-label-container`),
      ).toBe(true);
      expect(find(`input`)?.classList.contains(`tpk-mobile-input`)).toBe(true);
      expect(
        find(`label > div:first-of-type`)?.classList.contains(`tpk-label`),
      ).toBe(true);
      expect(
        find(`.tpk-mobile-container > div:last-of-type`)?.classList.contains(
          `tpk-validation-errors`,
        ),
      ).toBe(true);
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    const changeset = setChangeset('');
    await renderComponent(env, { disabled: true, changeset });
    expect(find('[data-test-tpk-mobile-input]')?.hasAttribute('disabled')).toBe(
      true,
    );
  });

  // skip: Accessibility — kept as comment due to known a11y issue
  // renderingTest.skip('Accessibility', async ({ env }) => { ... });
});
