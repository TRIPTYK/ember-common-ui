import TpkConfirmModalConfirm from './tpk-confirm-modal/confirm.js';
import TpkConfirmModalCancel from './tpk-confirm-modal/cancel.js';
import { hash } from '@ember/helper';
import TpkModal from './tpk-modal.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkConfirmModal = setComponentTemplate(precompileTemplate("<TpkModal data-test-confirm-modal @isOpen={{@isOpen}} @outsideClickHandler={{@outsideClickHandler}} @onClose={{@onClose}} @title={{@confirmQuestion}} ...attributes as |Modal|>\n\n  <Modal.Content>\n    {{yield (hash Confirm=(component TpkConfirmModalConfirmComponent onConfirm=@onConfirm) Cancel=(component TpkConfirmModalCancelComponent onClose=@onClose))}}\n  </Modal.Content>\n</TpkModal>", {
  strictMode: true,
  scope: () => ({
    TpkModal,
    hash,
    TpkConfirmModalConfirmComponent: TpkConfirmModalConfirm,
    TpkConfirmModalCancelComponent: TpkConfirmModalCancel
  })
}), templateOnly());

export { TpkConfirmModal as default };
//# sourceMappingURL=tpk-confirm-modal.js.map
