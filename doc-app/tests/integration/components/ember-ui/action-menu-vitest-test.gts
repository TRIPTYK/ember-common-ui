import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render, find } from '@ember/test-helpers';
import { actionMenuObject } from 'doc-app/tests/pages/ember-actions-menu';
import TpkActionsMenu from '@triptyk/ember-ui/components/tpk-actions-menu';
import EditIcon from 'doc-app/assets/icons/edit.gts';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | Action Menu', () => {
  async function renderActionMenu(act: () => void) {
    return render(
      <template>
        <TpkActionsMenu as |Action|>
          <Action @icon={{component EditIcon}} @action={{act}}>
            ActionText
          </Action>
        </TpkActionsMenu>
      </template>,
    );
  }

  renderingTest('actions list is not visible by default', async ({ env }) => {
    setupTest(env.owner);
    await renderActionMenu(() => {});
    expect(actionMenuObject.areActionsVisible).toBe(false);
  });

  renderingTest(
    'when seeAllAction button is clicked, toggle actions visibility',
    async ({ env }) => {
      setupTest(env.owner);
      await renderActionMenu(() => {});
      await actionMenuObject.seeAllAction();
      expect(actionMenuObject.areActionsVisible).toBe(true);
      await actionMenuObject.seeAllAction();
      expect(actionMenuObject.areActionsVisible).toBe(false);
    },
  );

  renderingTest(
    'when action is clicked, action is triggered and menu closes itself',
    async ({ env }) => {
      setupTest(env.owner);
      const act = vi.fn();
      await renderActionMenu(act);
      await actionMenuObject.seeAllAction();
      await actionMenuObject.actions.objectAt(0).trigger();
      expect(act).toHaveBeenCalledOnce();
      expect(actionMenuObject.areActionsVisible).toBe(false);
    },
  );

  renderingTest('when icon is passed, icon is displayed', async ({ env }) => {
    setupTest(env.owner);
    await renderActionMenu(() => {});
    await actionMenuObject.seeAllAction();
    expect(actionMenuObject.actions.objectAt(0).isIconRendered).toBe(true);
  });

  renderingTest('All base classes are present', async ({ env }) => {
    setupTest(env.owner);
    await renderActionMenu(() => {});
    expect(find('.actions')).toBeTruthy();
    expect(find('.open_actions')).toBeTruthy();
  });
});
