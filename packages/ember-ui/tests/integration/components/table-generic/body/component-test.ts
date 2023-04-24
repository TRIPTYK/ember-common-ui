import { module, test } from 'qunit';
import FakeData from '../data/fake-data';
import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | table-generic/body', function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    this.set('rowActions', FakeData.actionData);
  });

  test('it renders the actions correctly', async function (assert) {
    assert.expect(1);
    await render(hbs`
    <TpkActionsMenu as |Action|>
      {{#each this.rowActions as |act|}}
        <Action @icon={{act.icon}} @action={{act.action}}>
          Ajouter
        </Action>
      {{/each}}
    </TpkActionsMenu>
  `);
    await click('.open_actions');
    assert
      .dom('.actions ul button')
      .exists({ count: 2 }, '2 actions are rendered');
  });
});
