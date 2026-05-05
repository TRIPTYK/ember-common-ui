import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import {
  click,
  render,
  triggerKeyEvent,
  find,
  waitFor,
} from '@ember/test-helpers';
import TpkModal from '@triptyk/ember-ui/components/tpk-modal';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | modal', () => {
  async function setupComponent(
    isOpen: boolean,
    onClose: () => void,
    handler?: (e: MouseEvent | TouchEvent) => boolean,
  ) {
    const title = 'My modal';

    await render(
      <template>
        <div id="tpk-modal"></div>
        <div id="other" tabindex="0"></div>
        <TpkModal
          @isOpen={{isOpen}}
          @title={{title}}
          @onClose={{onClose}}
          @outsideClickHandler={{handler}}
          data-test-modal-toggle
          as |Modal|
        >
          <Modal.Content>
            <button type="button">Content</button>
          </Modal.Content>
        </TpkModal>
      </template>,
    );
  }

  renderingTest('default modal behavior', async ({ env }) => {
    setupTest(env.owner);
    await setupComponent(false, () => {});
    expect(find('[data-test-modal-toggle]')).toBeNull();
  });

  renderingTest('modal is open', async ({ env }) => {
    setupTest(env.owner);
    await setupComponent(true, () => {});

    expect(find('[data-test-modal-toggle]')).toBeTruthy();
    expect(find('.tpk-modal')).toBeTruthy();
    expect(find('.tpk-modal > .tpk-modal-content')).toBeTruthy();
  });

  renderingTest('esc calls onClose', async ({ env }) => {
    setupTest(env.owner);
    const onClose = vi.fn();
    await setupComponent(true, onClose);
    await waitFor('.tpk-modal button');
    await triggerKeyEvent(find('#other')!, 'keyup', 'Escape');
    expect(onClose).toHaveBeenCalledOnce();
  });

  renderingTest('click outside calls onClose', async ({ env }) => {
    setupTest(env.owner);
    const onClose = vi.fn();
    await setupComponent(true, onClose);
    await waitFor('.tpk-modal button');
    await click(find('#other')!);
    // click calls 2 different events
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  renderingTest(
    'if defined outsideClickHandler is called if click outside',
    async ({ env }) => {
      setupTest(env.owner);
      const onClose = vi.fn();
      const handler = vi.fn(() => true);

      await setupComponent(true, onClose, handler);
      await waitFor('.tpk-modal button');
      await click(find('#other')!);
      expect(handler).toHaveBeenCalledTimes(2);
    },
  );
});
