import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import {
  clearTempusDominusDate,
  setTempusDominusDate,
  openTempusDominus,
  closeTempusDominus,
  isTempusDominusOpen,
} from '@triptyk/ember-input/test-support/datepicker-helpers';
import { render, find } from '@ember/test-helpers';

import TpkDatepicker from '@triptyk/ember-input/components/tpk-datepicker';
import { setupTest } from '../../../../test-helper';

describe('Integration | Helpers | Datepicker', () => {
  const selector = '.tpk-datepicker-input-input';

  function renderDatepicker() {
    const date: Date = new Date(2022, 10, 12);
    const setDate = function () {};

    return render(
      <template>
        <TpkDatepicker
          @onChange={{setDate}}
          @value={{date}}
          @label="Testouille"
          as |D|
        >
          <D.Label />
          <D.Input />
        </TpkDatepicker>
      </template>,
    );
  }

  renderingTest('clear tempus dominus helper works', async ({ env }) => {
    setupTest(env.owner);
    await renderDatepicker();
    expect((find(selector) as HTMLInputElement)?.value).toBe('12/11/2022');
    clearTempusDominusDate(selector);
    expect((find(selector) as HTMLInputElement)?.value).toBe('');
  });

  renderingTest('set tempus dominus date helper works', async ({ env }) => {
    setupTest(env.owner);
    await renderDatepicker();
    const newDate: Date = new Date(2022, 10, 15);
    expect((find(selector) as HTMLInputElement)?.value).toBe('12/11/2022');
    setTempusDominusDate(selector, newDate);
    expect((find(selector) as HTMLInputElement)?.value).toBe('15/11/2022');
  });

  renderingTest(
    'open tempus dominus date picker helper works',
    async ({ env }) => {
      setupTest(env.owner);
      await renderDatepicker();
      expect(find('.tempus-dominus-widget')).toBeNull();
      openTempusDominus(selector);
      expect(find('.tempus-dominus-widget')?.classList.contains('show')).toBe(
        true,
      );
    },
  );

  renderingTest(
    'close tempus dominus date picker helper works',
    async ({ env }) => {
      setupTest(env.owner);
      await renderDatepicker();
      expect(find('.tempus-dominus-widget')).toBeNull();
      openTempusDominus(selector);
      expect(find('.tempus-dominus-widget')).toBeTruthy();
      expect(find('.tempus-dominus-widget')?.classList.contains('show')).toBe(
        true,
      );
      closeTempusDominus(selector);
      expect(find('.tempus-dominus-widget')?.classList.contains('show')).toBe(
        false,
      );
    },
  );

  renderingTest(
    'isOpen tempus dominus date picker helper works',
    async ({ env }) => {
      setupTest(env.owner);
      await renderDatepicker();
      openTempusDominus(selector);

      expect(isTempusDominusOpen()).toBe(true);
    },
  );

  renderingTest(
    'throw error when tempus dominus date picker not exist',
    async ({ env }) => {
      setupTest(env.owner);
      await renderDatepicker();
      const errorFn = vi.fn();
      try {
        openTempusDominus('.not-exist');
      } catch {
        errorFn();
      }

      expect(errorFn).toHaveBeenCalledOnce();
    },
  );
});
