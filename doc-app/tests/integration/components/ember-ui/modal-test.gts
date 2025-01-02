import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  render,
  triggerKeyEvent,
} from '@ember/test-helpers';
import TpkModal from '@triptyk/ember-ui/components/tpk-modal';
import { find } from '@ember/test-helpers';

module('Integration | Component | modal', function (hooks) {
  setupRenderingTest(hooks);

  async function setupComponent(isOpen: boolean, assert: Assert, handler?: (e: MouseEvent | TouchEvent) => boolean) {
    const title = 'My modal';
    const onClose = () => {
      assert.step('onClose');
      console.log('onClose');
    };

    await render(
      <template>
      <div id="tpk-modal"></div>
      <div id="other"></div>
      <TpkModal
        @isOpen={{isOpen}}
        @contentTitle={{title}}
        @onClose={{onClose}}
        @outsideClickHandler={{handler}}
        data-test-modal-toggle
      as |Modal|>
        <Modal.Content>
          <button type="button">Content</button>
        </Modal.Content>
      </TpkModal>
      </template>
    );
  }

  test('default modal behavior', async function (assert) {
    await setupComponent(false, assert);
    assert.dom('[data-test-modal-toggle]').doesNotExist();
  });

  test('modal is open', async function (assert) {
    await setupComponent(true, assert);

    assert.dom('[data-test-modal-toggle]').exists();
    assert.dom('.tpk-modal').exists();
    assert.dom('.tpk-modal > .tpk-modal-content').exists();
  });

  test('esc calls onClose', async function (assert) {
    await setupComponent(true, assert);
    await triggerKeyEvent(find('#other')!, 'keyup', 'Escape');
    assert.verifySteps(['onClose']);
  });

  test('click outside calls onClose', async function (assert) {
    await setupComponent(true, assert);
    await click(find('#other')!);
    // click calls 2 different events
    assert.verifySteps(['onClose', 'onClose']);
  });


  test('if defined outsideClickHandler is called if click outside', async function (assert) {
    const handler = () => {
      assert.step('handler');
      return true;
    };

    await setupComponent(true, assert, handler);

    await click(find('#other')!);
    assert.verifySteps(['handler', 'handler']);
  });
});
