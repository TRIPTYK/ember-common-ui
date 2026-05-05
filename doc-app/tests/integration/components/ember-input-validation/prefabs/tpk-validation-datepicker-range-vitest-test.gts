import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setTempusDominusDate } from '@triptyk/ember-input/test-support/datepicker-helpers';
import TpkValidationDatepickerRange from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker-range';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-datepicker-range', () => {
  async function renderComponentAndReturnChangeset(
    env: VitestTestEnv,
    params?: { disabled?: boolean },
  ) {
    setupTest(env.owner);

    const immerChangeset = new ImmerChangeset({ 'datepicker-range': null });

    await render(
      <template>
        <TpkValidationDatepickerRange
          @label="Datepicker range"
          @disabled={{params.disabled}}
          @changeset={{immerChangeset}}
          @validationField="datepicker-range"
        />
      </template>,
    );

    return immerChangeset;
  }

  renderingTest(
    'when change value in datepicker range, changeset should be update',
    async ({ env }) => {
      const date1 = new Date(2022, 10, 10);
      const date2 = new Date(2022, 10, 15);
      const changeset = await renderComponentAndReturnChangeset(env);
      setTempusDominusDate('.tpk-datepicker-range-input', date1, 0);
      setTempusDominusDate('.tpk-datepicker-range-input', date2, 1);
      expect(changeset.get('datepicker-range')).toEqual([date1, date2]);
    },
  );

  renderingTest(
    'It changes data-has-error attribute on error',
    async ({ env }) => {
      const changeset = await renderComponentAndReturnChangeset(env);
      await assertDataHasErrorAttribute(changeset, 'datepicker-range');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      await renderComponentAndReturnChangeset(env);

      expect(find(`.tpk-datepicker-range-container`)).toBeTruthy();
      expect(
        find(`.tpk-datepicker-range-container`)?.hasAttribute(
          `data-test-tpk-prefab-datepicker-range-container`,
        ),
      ).toBe(true);
      expect(
        find(`.tpk-datepicker-range-container .tpk-datepicker-range-input`),
      ).toBeTruthy();
      expect(
        find(`.tpk-datepicker-range-container .tpk-validation-errors`),
      ).toBeTruthy();
      expect(find(`.tpk-datepicker-range-container .tpk-label`)).toBeTruthy();
      expect(
        find('input')?.classList.contains(`tpk-datepicker-range-input`),
      ).toBe(true);
      expect(
        find(`label > div:first-of-type`)?.classList.contains(`tpk-label`),
      ).toBe(true);
      expect(
        find(
          `.tpk-datepicker-range-container > div:last-of-type`,
        )?.classList.contains(`tpk-validation-errors`),
      ).toBe(true);
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    await renderComponentAndReturnChangeset(env, { disabled: true });
    expect(
      find(`[data-test-tpk-datepicker-range-input]`)?.hasAttribute('disabled'),
    ).toBe(true);
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    await renderComponentAndReturnChangeset(env, { disabled: false });
    await a11yAudit();
  });
});
