import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { fillIn, find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationIban from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-iban';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-iban', () => {
  async function renderComponentAndReturnChangeset(
    { env }: { env: VitestTestEnv },
    params?: { disabled?: boolean },
  ) {
    setupTest(env.owner);

    const immerChangeset = new ImmerChangeset({ iban: '' });

    await render(
      <template>
        <TpkValidationIban
          @label="label"
          @mandatory={{true}}
          @changeset={{immerChangeset}}
          @disabled={{params.disabled}}
          @validationField="iban"
        />
      </template>,
    );

    return immerChangeset;
  }

  renderingTest(
    'it block typing if country code is not supported',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      await fillIn('[data-test-tpk-input-input]', 'ZZ68539007547034');
      expect(changeset.get('iban')).toBe('ZZ');
    },
  );

  renderingTest(
    'it lets you type BE IBAN and nicely format it',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      await fillIn('[data-test-tpk-input-input]', 'be68539007547034');
      expect(changeset.get('iban')).toBe('BE68 5390 0754 7034');
    },
  );

  renderingTest(
    'it lets you type LU IBAN and nicely format it',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      await fillIn('[data-test-tpk-input-input]', 'lu120010001234567891');
      expect(changeset.get('iban')).toBe('LU12 0010 0012 3456 7891');
    },
  );

  renderingTest(
    'it lets you type NL IBAN and nicely format it',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      await fillIn('[data-test-tpk-input-input]', 'NL91ABNA0417164300');
      expect(changeset.get('iban')).toBe('NL91 ABNA 0417 1643 00');
    },
  );

  renderingTest(
    'it lets you type FR IBAN and nicely format it',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      await fillIn('[data-test-tpk-iban-input]', 'FR1420041010050500013M02606');
      expect(changeset.get('iban')).toBe('FR14 2004 1010 0505 0001 3M02 606');
    },
  );

  renderingTest(
    'it lets you type DE IBAN and nicely format it',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      await fillIn('[data-test-tpk-iban-input]', 'DE91100000000123456789');
      expect(changeset.get('iban')).toBe('DE91 1000 0000 0123 4567 89');
    },
  );

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      await assertDataHasErrorAttribute(changeset, 'iban');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      await renderComponentAndReturnChangeset({ env });
      assertTpkCssClassesExist('iban');
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    await renderComponentAndReturnChangeset({ env }, { disabled: true });
    expect(find('[data-test-tpk-iban-input]')?.hasAttribute('disabled')).toBe(
      true,
    );
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    await renderComponentAndReturnChangeset({ env }, { disabled: false });
    await a11yAudit();
  });
});
