import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { fillIn, find, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationNationalNumber from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-national-number';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-national-number', () => {
  async function renderComponentAndReturnChangeset(
    { env }: { env: VitestTestEnv },
    { disabled = false }: { disabled?: boolean } = {},
  ) {
    setupTest(env.owner);

    const immerChangeset = new ImmerChangeset({ nationalNumber: '' });

    await render(
      <template>
        <TpkValidationNationalNumber
          @label="label"
          @disabled={{disabled}}
          @changeset={{immerChangeset}}
          @validationField="nationalNumber"
          class="custom-national-number-class"
        />
      </template>,
    );

    return immerChangeset;
  }

  renderingTest('let only number character go through', async ({ env }) => {
    const changeset = await renderComponentAndReturnChangeset({ env });
    await fillIn('[data-test-tpk-input-input]', 'SEBOUISNICE');
    expect(changeset.get('nationalNumber')).toBe('');
  });

  renderingTest('it format nicely the national number', async ({ env }) => {
    const changeset = await renderComponentAndReturnChangeset({ env });
    await fillIn('[data-test-tpk-input-input]', '99121223453');
    expect(changeset.get('nationalNumber')).toBe('99.12.12-234.53');
  });

  renderingTest(
    'Attributes should be passed to the container',
    async ({ env }) => {
      await renderComponentAndReturnChangeset({ env });
      expect(
        find(
          '[data-test-tpk-prefab-national-number-container]',
        )?.classList.contains('custom-national-number-class'),
      ).toBe(true);
    },
  );

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'nationalNumber',
      });
      expect(find('.tpk-validation-errors')).toBeTruthy();
      await settled();
      expect(find('.tpk-validation-errors span')?.textContent?.trim()).toBe(
        'required',
      );
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    await renderComponentAndReturnChangeset({ env }, { disabled: true });
    expect(
      find('[data-test-tpk-national-number-input]')?.hasAttribute('disabled'),
    ).toBe(true);
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    await renderComponentAndReturnChangeset({ env }, { disabled: false });
    await a11yAudit();
  });
});
