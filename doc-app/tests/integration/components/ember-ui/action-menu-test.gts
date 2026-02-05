import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { actionMenuObject } from 'doc-app/tests/pages/ember-actions-menu';
import TpkActionsMenu from '@triptyk/ember-ui/components/tpk-actions-menu';
import EditIcon from 'doc-app/assets/icons/edit.gts';

module('Integration | Component | Action Menu', function (hooks) {
  setupRenderingTest(hooks);

  async function renderActionMenu(assert: Assert) {
    const act = () => {
      assert.step('action');
    };

    return render(
      <template>
        <TpkActionsMenu as |Action|>
          <Action @icon={{component EditIcon}} @action={{act}}>
            ActionText
          </Action>
        </TpkActionsMenu>
      </template>
    );
  }

  test('actions list is not visible by default', async function (assert) {
    await renderActionMenu(assert);
    assert.false(actionMenuObject.areActionsVisible);
  });

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
    await renderActionMenu(assert);
    await actionMenuObject.seeAllAction();
    assert.true(actionMenuObject.actions.objectAt(0).isIconRendered);
  });

  test('All base classes are present', async function (assert) {
    await renderActionMenu(assert);
    assert.dom('.actions').exists();
    assert.dom('.open_actions').exists();
  });
});
