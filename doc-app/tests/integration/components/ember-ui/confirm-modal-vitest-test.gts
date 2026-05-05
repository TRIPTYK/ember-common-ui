import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render, find } from '@ember/test-helpers';
import { confirmModalObject } from 'doc-app/tests/pages/ember-confirm-modal';
import TpkConfirmModal from '@triptyk/ember-ui/components/tpk-confirm-modal';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | Confirm Modal', () => {
  async function renderConfirmModal(
    onConfirm: () => void,
    onClose: () => void,
    isOpen = true,
  ) {
    const confirmQuestion = 'Do you confirm ? :smirk:';

    return render(
      <template>
        <div id="tpk-modal"></div>
        <TpkConfirmModal
          @confirmQuestion={{confirmQuestion}}
          @isOpen={{isOpen}}
          @onConfirm={{onConfirm}}
          @onClose={{onClose}}
          as |confirmModal|
        >
          <confirmModal.Confirm>
            Confirmez banane
          </confirmModal.Confirm>
          <confirmModal.Cancel>
            Annuler banane
          </confirmModal.Cancel>
        </TpkConfirmModal>
      </template>,
    );
  }

  renderingTest(
    '@onConfirm is called when confirm is clicked',
    async ({ env }) => {
      setupTest(env.owner);
      const onConfirm = vi.fn();
      const onClose = vi.fn();
      await renderConfirmModal(onConfirm, onClose);
      await confirmModalObject.confirm.click();
      expect(onConfirm).toHaveBeenCalledOnce();
    },
  );

  renderingTest(
    '@onClose is called when cancel is clicked',
    async ({ env }) => {
      setupTest(env.owner);
      const onConfirm = vi.fn();
      const onClose = vi.fn();
      await renderConfirmModal(onConfirm, onClose);
      await confirmModalObject.cancel.click();
      expect(onClose).toHaveBeenCalledOnce();
    },
  );

  renderingTest('Modal is open if @isOpen is true', async ({ env }) => {
    setupTest(env.owner);
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    await renderConfirmModal(onConfirm, onClose);
    expect(find(confirmModalObject.scope)).toBeTruthy();
  });

  renderingTest('Modal is close if @isOpen is false', async ({ env }) => {
    setupTest(env.owner);
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    await renderConfirmModal(onConfirm, onClose, false);
    expect(find(confirmModalObject.scope)).toBeNull();
  });
});
