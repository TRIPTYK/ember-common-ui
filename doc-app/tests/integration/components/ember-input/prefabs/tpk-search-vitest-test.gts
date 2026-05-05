import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render, triggerEvent, waitFor, find } from '@ember/test-helpers';
import TpkSearch from '@triptyk/ember-input/components/prefabs/tpk-search';
import tpkSearchPage from '../../../../pages/tpk-search';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-search', () => {
  renderingTest(
    'render search icon by default. Switch to loader icon when onSearch is running',
    async ({ env }) => {
      setupTest(env.owner);
      const mockSearch = vi.fn(() => {
        return new Promise((res) => {
          setTimeout(() => {
            res(null);
          }, 500);
        });
      });

      await render(
        <template>
          <TpkSearch
            @label="label"
            @placeholder="Narrow the stack"
            @onSearch={{mockSearch}}
          />
        </template>,
      );
      await tpkSearchPage.input('search');
      await triggerEvent('form', 'submit');
      await waitFor('.tpk-search-loader');
      expect(find('.tpk-search-loader')).toBeTruthy();
      await waitFor('[data-test-tpk-search-icon]');
      expect(find('[data-test-tpk-search-icon]')).toBeTruthy();
      expect(mockSearch).toHaveBeenCalledOnce();
    },
  );

  renderingTest.skip('Accessibility', async ({ env }) => {
    setupTest(env.owner);
    const mockSearch = vi.fn(() => Promise.resolve(null));

    await render(
      <template>
        <TpkSearch
          @label="label"
          @placeholder="Narrow the stack"
          @onSearch={{mockSearch}}
        />
      </template>,
    );
    await a11yAudit();
  });
});
