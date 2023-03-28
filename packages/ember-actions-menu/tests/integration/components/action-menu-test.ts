/* eslint-disable ember/no-get */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, TestContext } from '@ember/test-helpers';
import { actionMenuObject } from 'dummy/tests/pages/ember-actions-menu';

interface ActionMenuTestContext extends TestContext {
  action: () => unknown;
  iconSrc?: string;
}

module('Integration | Component | Action Menu', function (hooks) {
  setupRenderingTest(hooks);

  function setActionMenuProperties(
    this: ActionMenuTestContext,
    // eslint-disable-next-line no-undef
    assert: Assert
  ) {
    this.action = () => {
      assert.step('action');
    };
  }

  // eslint-disable-next-line no-undef
  async function renderActionMenu(this: ActionMenuTestContext, assert: Assert) {
    setActionMenuProperties.call(this, assert);
    return render(hbs`
        <TpkActionsMenu as |Action|>
          <Action
            @icon={{this.iconSrc}}
            @action={{this.action}}
          >
            ActionText
          </Action>
        </TpkActionsMenu>
    `);
  }

  async function renderAndOpenActionsMenu(
    this: ActionMenuTestContext,
    // eslint-disable-next-line no-undef
    assert: Assert
  ) {
    await renderActionMenu.call(this, assert);
    await actionMenuObject.seeAllAction();
  }

  test<ActionMenuTestContext>('when seeAllAction button is clicked, toggle actions visibility', async function (assert) {
    assert.expect(2);

    await renderAndOpenActionsMenu.call(this, assert);
    assert.true(actionMenuObject.areActionsVisible);
    await actionMenuObject.seeAllAction();
    assert.false(actionMenuObject.areActionsVisible);
  });

  test<ActionMenuTestContext>('when action is clicked, action is triggered and menu closes itself', async function (assert) {
    assert.expect(3);

    await renderAndOpenActionsMenu.call(this, assert);
    await actionMenuObject.actions.objectAt(0).trigger();
    assert.verifySteps(['action']);
    assert.false(actionMenuObject.areActionsVisible);
  });

  test<ActionMenuTestContext>('when icon is passed, icon is displayed', async function (assert) {
    assert.expect(1);

    this.set('iconSrc', 'assets/action.svg');
    await renderAndOpenActionsMenu.call(this, assert);
    assert.true(actionMenuObject.actions.objectAt(0).isIconRendered);
  });

  test<ActionMenuTestContext>('when menu is opened, pressing ESC close it', async function (assert) {
    assert.expect(1);

    await renderAndOpenActionsMenu.call(this, assert);
    await actionMenuObject.escape();
    assert.false(actionMenuObject.areActionsVisible);
  });
});
