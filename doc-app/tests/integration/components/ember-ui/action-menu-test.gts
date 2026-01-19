import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { actionMenuObject } from 'doc-app/tests/pages/ember-actions-menu';
import TpkActionsMenu from '@triptyk/ember-ui/components/tpk-actions-menu';

module('Integration | Component | Action Menu', function (hooks) {
  setupRenderingTest(hooks);

  async function renderActionMenu( assert: Assert, iconSrc?: string) {
    const act = () => {
      assert.step('action');
    };

    return render(
      <template>
          <TpkActionsMenu as |Action|>
            <Action
              @icon={{iconSrc}}
              @action={{act}}
            >
              ActionText
            </Action>
          </TpkActionsMenu>
      </template>
    );
  }

  test('when seeAllAction button is clicked, toggle actions visibility', async function (assert) {
    await renderActionMenu(assert);
    await actionMenuObject.seeAllAction();
    assert.true(actionMenuObject.areActionsVisible);
    await actionMenuObject.seeAllAction();
    assert.false(actionMenuObject.areActionsVisible);
  });

  test('when action is clicked, action is triggered and menu closes itself', async function (assert) {
    await renderActionMenu(assert);
    await actionMenuObject.seeAllAction();
    await actionMenuObject.actions.objectAt(0).trigger();
    assert.verifySteps(['action']);
    assert.false(actionMenuObject.areActionsVisible);
  });

  test('when icon is passed, icon is displayed', async function (assert) {
    await renderActionMenu(assert, 'assets/action.svg');
    await actionMenuObject.seeAllAction();
    assert.true(actionMenuObject.actions.objectAt(0).isIconRendered);
  });

  test('when menu is opened, pressing ESC close it', async function (assert) {
    await renderActionMenu(assert);
    await actionMenuObject.escape();
    assert.false(actionMenuObject.areActionsVisible);
  });

  test('All base classes are present', async function (assert) {
    await renderActionMenu(assert);
    assert.dom('.actions').exists();
    assert.dom('.open_actions').exists();
  });
});
