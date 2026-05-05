import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setTempusDominusDate } from '@triptyk/ember-input/test-support/datepicker-helpers';
import TpkValidationDatepicker from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-datepicker', () => {
  async function renderComponentAndReturnChangeset(
    { env }: { env: VitestTestEnv },
    params?: { disabled?: boolean },
  ) {
    setupTest(env.owner);

    const immerChangeset = new ImmerChangeset({ datepicker: null });

    await render(
      <template>
        <TpkValidationDatepicker
          @label="Datepicker"
          @disabled={{params.disabled}}
          @changeset={{immerChangeset}}
          @validationField="datepicker"
        />
      </template>,
    );

    return immerChangeset;
  }

  renderingTest(
    'when change value in datepicker, changeset should be updated',
    async ({ env }) => {
      const date = new Date(2022, 10, 10);
      const changeset = await renderComponentAndReturnChangeset({ env });
      setTempusDominusDate('.tpk-datepicker-input', date);
      expect(changeset.get('datepicker')).toEqual(date);
    },
  );

  renderingTest(
    'It changes data-has-error attribute on error',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset({ env });
      await assertDataHasErrorAttribute(changeset, 'datepicker');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      await renderComponentAndReturnChangeset({ env });

      expect(find(`.tpk-datepicker-container`)).toBeTruthy();
      expect(
        find(`.tpk-datepicker-container`)?.hasAttribute(
          `data-test-tpk-prefab-datepicker-container`,
        ),
      ).toBe(true);
      expect(
        find(`.tpk-datepicker-container .tpk-datepicker-input`),
      ).toBeTruthy();
      expect(
        find(`.tpk-datepicker-container .tpk-validation-errors`),
      ).toBeTruthy();
      expect(find(`.tpk-datepicker-container .tpk-label`)).toBeTruthy();
      expect(find('input')?.classList.contains(`tpk-datepicker-input`)).toBe(
        true,
      );
      expect(
        find(`label > div:first-of-type`)?.classList.contains(`tpk-label`),
      ).toBe(true);
      expect(
        find(
          `.tpk-datepicker-container > div:last-of-type`,
        )?.classList.contains(`tpk-validation-errors`),
      ).toBe(true);
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    await renderComponentAndReturnChangeset({ env }, { disabled: true });
    expect(
      find(`[data-test-tpk-datepicker-input]`)?.hasAttribute('disabled'),
    ).toBe(true);
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    await renderComponentAndReturnChangeset({ env }, { disabled: false });
    await a11yAudit();
  });
});
