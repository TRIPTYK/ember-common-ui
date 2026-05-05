import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { find, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import {
  setTempusDominusDate,
  openTempusDominus,
} from '@triptyk/ember-input/test-support/datepicker-helpers';
import TpkValidationTimepicker from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-timepicker';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-timepicker', () => {
  async function renderComponentAndReturnChangeset(
    { env }: { env: VitestTestEnv },
    params?: { disabled?: boolean },
  ) {
    setupTest(env.owner);

    const immerChangeset = new ImmerChangeset({ time: null });

    await render(
      <template>
        <TpkValidationTimepicker
          @label="Time"
          @changeset={{immerChangeset}}
          @validationField="time"
          @disabled={{params.disabled}}
          class="tpk-input"
        />
      </template>,
    );

    return immerChangeset;
  }

  renderingTest(
    'when change value in timepicker, changeset should be update',
    async ({ env }) => {
      const date = new Date(2022, 10, 10, 12, 30);
      const changeset = await renderComponentAndReturnChangeset({ env });
      setTempusDominusDate('.tpk-timepicker-input', date);
      expect(changeset.get('time')).toEqual(date);
    },
  );

  renderingTest(
    'Should show time container and cannot get the calendar',
    async ({ env }) => {
      await renderComponentAndReturnChangeset({ env });
      openTempusDominus('.tpk-timepicker-input');
      expect(find('.time-container')).toBeTruthy();
      expect(find('.calendar-container')).toBeNull();
      expect(find('.icon.icon-calendar')).toBeNull();
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
        key: 'time',
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
      await renderComponentAndReturnChangeset({ env });
      expect(find(`.tpk-timepicker-container`)).toBeTruthy();
      expect(
        find(`.tpk-timepicker-container`)?.hasAttribute(
          `data-test-tpk-prefab-timepicker-container`,
        ),
      ).toBe(true);
      expect(
        find(`.tpk-timepicker-container .tpk-timepicker-input`),
      ).toBeTruthy();
      expect(
        find(`.tpk-timepicker-container .tpk-validation-errors`),
      ).toBeTruthy();
      expect(find(`.tpk-timepicker-container .tpk-label`)).toBeTruthy();
      expect(find('input')?.classList.contains(`tpk-timepicker-input`)).toBe(
        true,
      );
      expect(
        find(`label > div:first-of-type`)?.classList.contains(`tpk-label`),
      ).toBe(true);
      expect(
        find(
          `.tpk-timepicker-container > div:last-of-type`,
        )?.classList.contains(`tpk-validation-errors`),
      ).toBe(true);
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    await renderComponentAndReturnChangeset({ env }, { disabled: true });
    expect(
      find('[data-test-tpk-timepicker-input]')?.hasAttribute('disabled'),
    ).toBe(true);
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    await renderComponentAndReturnChangeset({ env }, { disabled: false });
    await a11yAudit();
  });
});
