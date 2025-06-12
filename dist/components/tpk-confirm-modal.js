import TpkConfirmModalConfirmComponent from './tpk-confirm-modal/confirm.js';
import TpkConfirmModalCancelComponent from './tpk-confirm-modal/cancel.js';
import { hash } from '@ember/helper';
import TpkModalComponent from './tpk-modal.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkConfirmModalComponent = setComponentTemplate(precompileTemplate("\n    <TpkModal data-test-confirm-modal @isOpen={{@isOpen}} @outsideClickHandler={{@outsideClickHandler}} @onClose={{@onClose}} @title={{@confirmQuestion}} ...attributes as |Modal|>\n\n      <Modal.Content>\n        {{yield (hash Confirm=(component TpkConfirmModalConfirmComponent onConfirm=@onConfirm) Cancel=(component TpkConfirmModalCancelComponent onClose=@onClose))}}\n      </Modal.Content>\n    </TpkModal>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkModal: TpkModalComponent,
    hash,
    TpkConfirmModalConfirmComponent,
    TpkConfirmModalCancelComponent
  })
}), templateOnly());

export { TpkConfirmModalComponent as default };
//# sourceMappingURL=tpk-confirm-modal.js.map
