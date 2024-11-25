import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, type TestContext } from '@ember/test-helpers';
import { confirmModalObject } from 'doc-app/tests/pages/ember-confirm-modal';
import TpkConfirmModal from '@triptyk/ember-ui/components/tpk-confirm-modal';

interface ThisTestContext extends TestContext {
}

module('Integration | Component | Confirm Modal', function (hooks) {
  setupRenderingTest(hooks);


  async function renderConfirmModal(
    this: ThisTestContext,
    // eslint-disable-next-line no-undef
    assert: Assert,
    isOpen = true,
  ) {
    const onClose = function () {
      assert.step('onClose');
    };
    const onConfirm = function () {
      assert.step('onConfirm');
    };
    const confirmQuestion = 'Do you confirm ? :smirk:';

    return render<ThisTestContext>(<template>
			<div id="tpk-modal"></div>
			<TpkConfirmModal
				@title={{confirmQuestion}}
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
      </template>);
  }

  test<ThisTestContext>('@onConfirm is called when confirm is clicked', async function (assert) {
    await renderConfirmModal.call(this, assert);
    await confirmModalObject.confirm.click();
    assert.verifySteps(['onConfirm']);
  });

  test<ThisTestContext>('@onClose is called when cancel is clicked', async function (assert) {
    await renderConfirmModal.call(this, assert);
    await confirmModalObject.cancel.click();
    assert.verifySteps(['onClose']);
  });

  test<ThisTestContext>('Modal is open if @isOpen is true', async function (assert) {
    await renderConfirmModal.call(this, assert);
    assert.dom(confirmModalObject.scope).exists();
  });

  test<ThisTestContext>('Modal is close if @isOpen is false', async function (assert) {
    await renderConfirmModal.call(this, assert, false);
    assert.dom(confirmModalObject.scope).doesNotExist();
  });
});
