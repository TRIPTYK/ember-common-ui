import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, type TestContext } from '@ember/test-helpers';
import { actionMenuObject } from 'doc-app/tests/pages/ember-actions-menu';
import TpkActionsMenu from '@triptyk/ember-ui/components/tpk-actions-menu';

interface ActionMenuTestContext extends TestContext {
}

module('Integration | Component | Action Menu', function (hooks) {
  setupRenderingTest(hooks);
  // eslint-disable-next-line no-undef
  async function renderActionMenu(this: ActionMenuTestContext, assert: Assert, iconSrc?: string) {
    const act = () => {
      assert.step('action');
    };

    return render<ActionMenuTestContext>(
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

  async function renderAndOpenActionsMenu(
    this: ActionMenuTestContext,
    // eslint-disable-next-line no-undef
    assert: Assert,
    iconSrc?: string,
  ) {
    await renderActionMenu.call(this, assert, iconSrc);
    await actionMenuObject.seeAllAction();
  }

  test<ActionMenuTestContext>('when seeAllAction button is clicked, toggle actions visibility', async function (assert) {
    await renderAndOpenActionsMenu.call(this, assert);
    assert.true(actionMenuObject.areActionsVisible);
    await actionMenuObject.seeAllAction();
    assert.false(actionMenuObject.areActionsVisible);
  });

  test<ActionMenuTestContext>('when action is clicked, action is triggered and menu closes itself', async function (assert) {
    await renderAndOpenActionsMenu.call(this, assert);
    await actionMenuObject.actions.objectAt(0).trigger();
    assert.verifySteps(['action']);
    assert.false(actionMenuObject.areActionsVisible);
  });

  test<ActionMenuTestContext>('when icon is passed, icon is displayed', async function (assert) {
    await renderAndOpenActionsMenu.call(this, assert, 'assets/action.svg');
    assert.true(actionMenuObject.actions.objectAt(0).isIconRendered);
  });

  test<ActionMenuTestContext>('when menu is opened, pressing ESC close it', async function (assert) {
    await renderAndOpenActionsMenu.call(this, assert);
    await actionMenuObject.escape();
    assert.false(actionMenuObject.areActionsVisible);
  });

  // eslint-disable-next-line no-undef
  function assertBaseClassesPresence(assert: Assert) {
    assert.dom('.actions').exists();
    assert.dom('.open_actions').exists();
  }

  test<ActionMenuTestContext>('All base classes are present', async function (assert) {
    await renderAndOpenActionsMenu.call(this, assert);
    assertBaseClassesPresence(assert);
  });
});
