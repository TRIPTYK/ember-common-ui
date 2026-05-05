import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render, find } from '@ember/test-helpers';
import TpkConfirmModalPrefab from '@triptyk/ember-ui/components/prefabs/tpk-confirm-modal-prefab';
import { confirmModalObject } from 'doc-app/tests/pages/ember-confirm-modal';
import { setupTest } from '../../../../test-helper';

describe('Integration | Component | Prefabs | Tpk-confirm-modal-prefab', () => {
  async function renderComponent(
    onClose: () => void,
    onConfirm: () => void,
    isOpen = true,
  ) {
    const confirmQuestion = 'Do you confirm ? :smirk:';
    await render(
      <template>
        <div id="tpk-modal">
          <TpkConfirmModalPrefab
            @onClose={{onClose}}
            @onConfirm={{onConfirm}}
            @icon=""
            @cancelText="Annuler"
            @confirmText="Confirmer"
            @confirmQuestion={{confirmQuestion}}
            @isOpen={{isOpen}}
          />
        </div>
      </template>,
    );
  }

  renderingTest('Render prefab confirm modal', async ({ env }) => {
    setupTest(env.owner);
    await renderComponent(vi.fn(), vi.fn());
    expect(find('[data-test-confirm-modal-container]')).toBeTruthy();
  });

  renderingTest(
    '@onClose is called when cancel is clicked',
    async ({ env }) => {
      setupTest(env.owner);
      const onClose = vi.fn();
      await renderComponent(onClose, vi.fn());
      await confirmModalObject.cancel.click();
      expect(onClose).toHaveBeenCalledOnce();
    },
  );

  renderingTest('Modal is open if @isOpen is true', async ({ env }) => {
    setupTest(env.owner);
    await renderComponent(vi.fn(), vi.fn());
    expect(find(confirmModalObject.scope)).toBeTruthy();
  });

  renderingTest('Modal is close if @isOpen is false', async ({ env }) => {
    setupTest(env.owner);
    await renderComponent(vi.fn(), vi.fn(), false);
    expect(find(confirmModalObject.scope)).toBeNull();
  });
});
