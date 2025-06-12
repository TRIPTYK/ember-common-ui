import TpkConfirmModalComponent from '../tpk-confirm-modal.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkConfirmModalPrefabComponent = setComponentTemplate(precompileTemplate("\n    <TpkConfirmModalComponent class=\"tpk-confirm-modal-container\" @onClose={{@onClose}} @onConfirm={{@onConfirm}} @cancelText={{@cancelText}} @confirmText={{@confirmText}} @confirmQuestion={{@confirmQuestion}} @isOpen={{@isOpen}} data-test-confirm-modal-container ...attributes as |M|>\n      <M.Cancel @icon={{@icon}} @cancelText={{@cancelText}} />\n      <M.Confirm @confirmText={{@confirmText}} />\n    </TpkConfirmModalComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkConfirmModalComponent
  })
}), templateOnly());

export { TpkConfirmModalPrefabComponent as default };
//# sourceMappingURL=tpk-confirm-modal-prefab.js.map
