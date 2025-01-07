import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  render, triggerEvent, waitFor } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import TpkSearch from '@triptyk/ember-input/components/prefabs/tpk-search';
import tpkSearchPage from '../../../../pages/tpk-search';
import { a11yAudit } from 'ember-a11y-testing/test-support';


module(
  'Integration | Component | Prefabs | tpk-search',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(assert: Assert) {
      const mockSearch = () => {
        return new Promise((res) => {
          assert.step('search');
          setTimeout(() => {
            res(null);
          }, 500);
        });
      };

      await render(
        <template>
          <TpkSearch
            @label="label"
            @placeholder="Narrow the stack"
            @onSearch={{mockSearch}}
          />
        </template>
      );
    }

    test('render search icon by default. Switch to loader icon when onSearch is running', async function (assert) {
      await renderComponent(assert);
      await tpkSearchPage.input('search');
      triggerEvent('form', 'submit')
      await waitFor('.tpk-search-loader');
      assert.dom('.tpk-search-loader').exists();
      await waitFor('[data-test-tpk-search-icon]');
      assert.dom('[data-test-tpk-search-icon]').exists();
      assert.verifySteps(['search']);
    });

    test('Accessibility', async function (assert) {
      assert.expect(0);
      await renderComponent(assert);
      await a11yAudit();
    });
  },
);
