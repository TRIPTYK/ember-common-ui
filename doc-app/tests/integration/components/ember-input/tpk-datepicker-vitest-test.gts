import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import {
  fillIn,
  render,
  click,
  waitFor,
  triggerKeyEvent,
  find,
} from '@ember/test-helpers';
import {
  setTempusDominusDate,
  openTempusDominus,
  closeTempusDominus,
} from '@triptyk/ember-input/test-support/datepicker-helpers';
import TpkDatepicker from '@triptyk/ember-input/components/tpk-datepicker';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | tpk-datepicker', () => {
  renderingTest('datepicker by default', async ({ env }) => {
    setupTest(env.owner);
    const date: Date = new Date(2022, 10, 12);
    const setDate = vi.fn();

    await render(
      <template>
        <TpkDatepicker
          @value={{null}}
          @onChange={{setDate}}
          @label="Default"
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    setTempusDominusDate('.tpk-datepicker-input-input', date);
    expect(
      (find('.tpk-datepicker-input-input') as HTMLInputElement)?.value,
    ).toBe('12/11/2022');
    expect(setDate).toHaveBeenCalledOnce();
    const [dates] = setDate.mock.calls[0] as [Date[]];
    expect(dates[0]?.toDateString()).toBe(date.toDateString());
  });

  renderingTest('datepicker with default value', async ({ env }) => {
    setupTest(env.owner);
    const date: Date = new Date(2022, 10, 13);
    const setDate = function () {};

    await render(
      <template>
        <TpkDatepicker
          @onChange={{setDate}}
          @label="Default value"
          @value={{date}}
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    expect(
      (find('.tpk-datepicker-input-input') as HTMLInputElement)?.value,
    ).toBe('13/11/2022');
  });

  renderingTest('datepicker is disabled', async ({ env }) => {
    setupTest(env.owner);
    await render(
      <template>
        <TpkDatepicker
          @value={{null}}
          @disabled={{true}}
          @label="Disabled"
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    expect(find('.tpk-datepicker-input-input')?.hasAttribute('disabled')).toBe(
      true,
    );
  });

  renderingTest('datepicker use current date', async ({ env }) => {
    setupTest(env.owner);
    const date: Date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    await render(
      <template>
        <TpkDatepicker
          @value={{null}}
          @label="Current"
          @useCurrent={{true}}
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    // Open the datepicker in order to set current date default
    openTempusDominus('.tpk-datepicker-input-input');

    closeTempusDominus('.tpk-datepicker-input-input');
    expect(
      (find('.tpk-datepicker-input-input') as HTMLInputElement)?.value,
    ).toBe(formattedDate);
  });

  renderingTest('datepicker range', async ({ env }) => {
    setupTest(env.owner);
    const date: Date = new Date(2022, 10, 13);
    const date2: Date = new Date(2022, 10, 16);
    const setDate = function () {};

    await render(
      <template>
        <TpkDatepicker
          @value={{null}}
          @onChange={{setDate}}
          @label="Range"
          @mode="range"
          @multipleDatesSeparator=" jusqu'au "
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    setTempusDominusDate('.tpk-datepicker-input-input', date, 0);
    setTempusDominusDate('.tpk-datepicker-input-input', date2, 1);

    expect(
      (find('.tpk-datepicker-input-input') as HTMLInputElement)?.value,
    ).toBe("13/11/2022 jusqu'au 16/11/2022");
  });

  renderingTest(
    'datepicker range trigger changeEvent when select two dates',
    async ({ env }) => {
      setupTest(env.owner);
      const date: Date = new Date(2022, 10, 13);
      const date2: Date = new Date(2022, 10, 16);
      const setDate = vi.fn();

      await render(
        <template>
          <TpkDatepicker
            @value={{null}}
            @onChange={{setDate}}
            @label="Range"
            @mode="range"
            @multipleDatesSeparator=" jusqu'au "
            as |D|
          >
            <D.Label />
            <D.Input />
          </TpkDatepicker>
        </template>,
      );
      setTempusDominusDate('.tpk-datepicker-input-input', date, 0);
      setTempusDominusDate('.tpk-datepicker-input-input', date2, 1);
      const [dates] = setDate.mock.calls[setDate.mock.calls.length - 1] as [
        Date[],
      ];
      expect(dates.length).toBe(2);
    },
  );

  // Currently not available
  // https://github.com/Eonasdan/tempus-dominus/issues/2830
  // skip('datepicker range with default value', ...)

  renderingTest('datepicker with min and max date', async ({ env }) => {
    setupTest(env.owner);
    const date: Date = new Date(2022, 10, 15);
    const minDate: Date = new Date(2022, 10, 13);
    const maxDate: Date = new Date(2022, 10, 16);
    const setDate = function () {};

    await render(
      <template>
        <TpkDatepicker
          @onChange={{setDate}}
          @value={{date}}
          @label="Min/Max"
          @minDate={{minDate}}
          @maxDate={{maxDate}}
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    expect(find('.day[data-day="12"]')?.classList.contains('disabled')).toBe(
      true,
    );
    expect(find('.day[data-day="17"]')?.classList.contains('disabled')).toBe(
      true,
    );
    expect(find('.day[data-day="15"]')?.classList.contains('disabled')).toBe(
      false,
    );
  });

  renderingTest('show only timepicker', async ({ env }) => {
    setupTest(env.owner);
    const date: Date = new Date(2022, 10, 15, 8, 30);
    const setDate = function () {};

    await render(
      <template>
        <TpkDatepicker
          @onChange={{setDate}}
          @value={{date}}
          @enableTime={{true}}
          @label="Time"
          @noCalendar={{true}}
          @dateFormat="HH:mm"
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    expect(find('.date-container')).toBeNull();
  });

  renderingTest('datepicker prompt time on date select', async ({ env }) => {
    setupTest(env.owner);
    const date: Date = new Date(2022, 10, 15);
    const setDate = function () {};

    await render(
      <template>
        <TpkDatepicker
          @onChange={{setDate}}
          @value={{date}}
          @enableTime={{true}}
          @label="Prompt"
          @promptTimeOnDateChange={{true}}
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    await click('.day[data-day="17"]');
    await waitFor('.time-container.show');
    expect(find('.time-container')?.classList.contains('show')).toBe(true);
  });

  renderingTest('datepicker viewMode show month', async ({ env }) => {
    setupTest(env.owner);
    const date: Date = new Date(2022, 10, 15);
    const setDate = function () {};

    await render(
      <template>
        <TpkDatepicker
          @onChange={{setDate}}
          @value={{date}}
          @label="View Mode"
          @viewMode="months"
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    expect(find('.date-container-months')).toBeTruthy();
  });

  renderingTest(
    'datepicker with a mask and a specific format',
    async ({ env }) => {
      setupTest(env.owner);
      const setDate = function () {};

      await render(
        <template>
          <TpkDatepicker
            @value={{null}}
            @onChange={{setDate}}
            @label="Mask/Format"
            @dateFormat="dd/MM-yyyy"
            @mask="d/m-Y"
            as |D|
          >
            <D.Label />
            <D.Input />
          </TpkDatepicker>
        </template>,
      );
      await fillIn('.tpk-datepicker-input-input', '13/11-2022');
      expect(
        (find('.tpk-datepicker-input-input') as HTMLInputElement)?.value,
      ).toBe('13/11-2022');
    },
  );

  renderingTest('datepicker with time', async ({ env }) => {
    setupTest(env.owner);
    const date: Date = new Date(2022, 10, 15, 8, 30);
    const setDate = function () {};

    await render(
      <template>
        <TpkDatepicker
          @value={{null}}
          @onChange={{setDate}}
          @label="Time format"
          @dateFormat="dd/MM/yyyy | HH:mm"
          @enableTime={{true}}
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    setTempusDominusDate('.tpk-datepicker-input-input', date);
    expect(
      (find('.tpk-datepicker-input-input') as HTMLInputElement)?.value,
    ).toBe('15/11/2022 | 08:30');
  });

  renderingTest('change locale for datepicker', async ({ env }) => {
    setupTest(env.owner);
    const date: Date = new Date(2022, 9, 15);
    const setDate = function () {};

    await render(
      <template>
        <TpkDatepicker
          @onChange={{setDate}}
          @label="Locale"
          @value={{date}}
          @locale="es"
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    expect(find('.picker-switch')?.textContent?.trim()).toBe('octubre de 22');
  });

  renderingTest('show today button', async ({ env }) => {
    setupTest(env.owner);
    const setDate = function () {};

    await render(
      <template>
        <TpkDatepicker
          @value={{null}}
          @onChange={{setDate}}
          @label="Show today"
          @todayButton={{true}}
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    expect(find('.icon.icon-today')).toBeTruthy();
  });

  renderingTest('When press tab, datepicker is closed', async ({ env }) => {
    setupTest(env.owner);
    const setDate = function () {};

    await render(
      <template>
        <TpkDatepicker
          @onChange={{setDate}}
          @label="Show today"
          @todayButton={{true}}
          @value={{null}}
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
        <input type="text" id="input2" />
      </template>,
    );
    openTempusDominus('.tpk-datepicker-input-input');

    expect(find('.tempus-dominus-widget')?.classList.contains('show')).toBe(
      true,
    );
    await triggerKeyEvent('.tpk-datepicker-input-input', 'keydown', 'Tab');
    expect(find('.tempus-dominus-widget')?.classList.contains('show')).toBe(
      false,
    );
  });
});
