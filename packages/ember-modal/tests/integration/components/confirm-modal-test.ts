/* eslint-disable ember/no-get */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, TestContext } from '@ember/test-helpers';
import { confirmModalObject } from 'dummy/tests/pages/ember-confirm-modal';

interface ConfirmModalTestContext extends TestContext {
  onClose: (e: Event) => unknown;
  onConfirm: (e: Event) => unknown;
  confirmQuestion: string;
  isOpen?: boolean;
  classless?: boolean;
}

module('Integration | Component | Confirm Modal', function (hooks) {
  setupRenderingTest(hooks);

  function setConfirmModalProperties(
    this: ConfirmModalTestContext,
    assert: Assert
  ) {
    this.onClose = function () {
      assert.step('onClose');
    };
    this.onConfirm = function () {
      assert.step('onConfirm');
    };
    this.confirmQuestion = 'Do you confirm ? :smirk:';
    this.classless = false;
    this.isOpen = true;
  }

  async function renderConfirmModal(
    this: ConfirmModalTestContext,
    assert: Assert
  ) {
    setConfirmModalProperties.call(this, assert);
    return render(hbs`
			<div id="tpk-modal"></div>
			<TpkConfirmModal 
				@confirmQuestion={{this.confirmQuestion}}
				@isOpen={{this.isOpen}}
				@onConfirm={{this.onConfirm}}
				@onClose={{this.onClose}}
				@classless={{this.classless}}
				as |confirmModal|
			>
				<confirmModal.Confirm>
					Confirmez banane
				</confirmModal.Confirm>
				<confirmModal.Cancel>
					Annuler banane
				</confirmModal.Cancel>
			</TpkConfirmModal> 
		`);
  }

  test<ConfirmModalTestContext>('confirmQuestion render in the modal', async function (assert) {
    assert.expect(1);
    await renderConfirmModal.call(this, assert);
    const modalConfirmQuestion = 'Do you confirm ? :smirk:';
    assert.strictEqual(confirmModalObject.title, modalConfirmQuestion);
  });

  test<ConfirmModalTestContext>('@onConfirm is called when confirm is clicked', async function (assert) {
    assert.expect(2);
    await renderConfirmModal.call(this, assert);
    await confirmModalObject.confirm.click();
    assert.verifySteps(['onConfirm']);
  });

  test<ConfirmModalTestContext>('@onClose is called when cancel is clicked', async function (assert) {
    assert.expect(2);
    await renderConfirmModal.call(this, assert);
    await confirmModalObject.cancel.click();
    assert.verifySteps(['onClose']);
  });

  test<ConfirmModalTestContext>('Modal is open if @isOpen is true', async function (assert) {
    assert.expect(1);
    await renderConfirmModal.call(this, assert);
    assert.dom(confirmModalObject.scope).exists();
  });

  test<ConfirmModalTestContext>('Modal is close if @isOpen is false', async function (assert) {
    assert.expect(1);
    await renderConfirmModal.call(this, assert);
    this.set('isOpen', false);
    assert.dom(confirmModalObject.scope).doesNotExist();
  });

  test<ConfirmModalTestContext>('@classless===true remove base class', async function (assert) {
    assert.expect(2);
    await renderConfirmModal.call(this, assert);
    this.set('classless', true);
    assert.dom('.tpk-confirm-modal-title').doesNotExist();
    assert.dom('.tpk-confirm-modal-btn-section').doesNotExist();
  });

  test<ConfirmModalTestContext>('@classless===false does not remove base class', async function (assert) {
    assert.expect(2);
    await renderConfirmModal.call(this, assert);
    assert.dom('.tpk-confirm-modal-title').exists();
    assert.dom('.tpk-confirm-modal-btn-section').exists();
  });
});
