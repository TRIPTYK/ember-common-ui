import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { fillIn, find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationCurrency from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-currency';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-currency', () => {
  function setupChangeset() {
    return new ImmerChangeset({ currency: 123.56 });
  }

  async function renderComponent(
    { env }: { env: VitestTestEnv },
    changeset: ImmerChangeset,
    { scale = 2, disabled = false } = {},
  ) {
    setupTest(env.owner);

    const onChange = (value: string | number | Date | null) => {
      changeset.set('currency', value);
    };

    await render(
      <template>
        <TpkValidationCurrency
          @label="label"
          @changeset={{changeset}}
          @onChange={{onChange}}
          @validationField="currency"
          @scale={{scale}}
          @disabled={{disabled}}
        />
      </template>,
    );
  }

  renderingTest('Currency should be euro by default', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent({ env }, changeset);
    expect((find('input') as HTMLInputElement)?.value).toBe('123.56 €');
  });

  renderingTest(
    'Input type should be text (mandatory for IMask)',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, changeset);
      expect(
        find('input')?.hasAttribute('type') &&
          find('input')?.getAttribute('type'),
      ).toBe('text');
    },
  );

  renderingTest('Should set value as number', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent({ env }, changeset);
    expect(changeset.get('currency')).toBe(123.56);
  });

  renderingTest(
    'Should set value as number when value change',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, changeset);
      await fillIn('input', '123.45');
      expect(changeset.get('currency')).toBe(123.45);
    },
  );

  renderingTest(
    '@scale should control the decimals of the input',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, changeset, { scale: 3 });
      expect(
        (find('[data-test-tpk-currency-input]') as HTMLInputElement)?.value,
      ).toBe('123.560 €');
    },
  );

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, changeset);
      await assertDataHasErrorAttribute(changeset, 'currency');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent({ env }, changeset);
      assertTpkCssClassesExist('currency');
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent({ env }, changeset, { disabled: true });
    expect(
      find('[data-test-tpk-currency-input]')?.hasAttribute('disabled'),
    ).toBe(true);
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent({ env }, changeset, { disabled: false });
    await a11yAudit();
  });
});
