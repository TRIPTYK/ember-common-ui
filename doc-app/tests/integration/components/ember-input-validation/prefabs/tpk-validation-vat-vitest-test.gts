import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { fillIn, find, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationVat from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-vat';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-vat', () => {
  async function renderComponentAndReturnChangeset(
    { env }: { env: VitestTestEnv },
    params?: { disabled?: boolean },
  ) {
    setupTest(env.owner);

    const immerChangeset = new ImmerChangeset({ vat: '' });

    await render(
      <template>
        <TpkValidationVat
          @label="label"
          @mandatory={{true}}
          @disabled={{params.disabled}}
          @changeset={{immerChangeset}}
          @validationField="vat"
          class="custom-vat-class"
        />
      </template>,
    );

    return immerChangeset;
  }

  renderingTest(
    'it block typing if country code is not supported',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      await fillIn('[data-test-tpk-vat-input]', 'ZZ68539007547034');
      expect(changeset.get('vat')).toBe('ZZ');
    },
  );

  renderingTest('it lets you type BE VAT', async ({ env }) => {
    const changeset = await renderComponentAndReturnChangeset({ env });
    await fillIn('[data-test-tpk-vat-input]', 'BE0999999999');
    expect(changeset.get('vat')).toBe('BE0999999999');
  });

  renderingTest('it lets you type LU VAT', async ({ env }) => {
    const changeset = await renderComponentAndReturnChangeset({ env });
    await fillIn('[data-test-tpk-vat-input]', 'LU99999999');
    expect(changeset.get('vat')).toBe('LU99999999');
  });

  renderingTest('it lets you type NL VAT', async ({ env }) => {
    const changeset = await renderComponentAndReturnChangeset({ env });
    await fillIn('[data-test-tpk-vat-input]', 'NL000099998B57');
    expect(changeset.get('vat')).toBe('NL000099998B57');
  });

  renderingTest('it lets you type FR VAT', async ({ env }) => {
    const changeset = await renderComponentAndReturnChangeset({ env });
    await fillIn('[data-test-tpk-vat-input]', 'FR12345678901');
    expect(changeset.get('vat')).toBe('FR12345678901');
  });

  renderingTest('it lets you type DE VAT', async ({ env }) => {
    const changeset = await renderComponentAndReturnChangeset({ env });
    await fillIn('[data-test-tpk-vat-input]', 'DE123456789');
    expect(changeset.get('vat')).toBe('DE123456789');
  });

  renderingTest('Attributes should be passed to the input', async ({ env }) => {
    await renderComponentAndReturnChangeset({ env });
    expect(
      find('.tpk-vat-container')?.classList.contains('custom-vat-class'),
    ).toBe(true);
  });

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'vat',
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
    expect(find('[data-test-tpk-vat-input]')?.hasAttribute('disabled')).toBe(
      true,
    );
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    await renderComponentAndReturnChangeset({ env }, { disabled: false });
    await a11yAudit();
  });
});
