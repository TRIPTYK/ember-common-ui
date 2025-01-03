import type { WithBoundArgs } from "@glint/template";
import type { TpkConfirmModalSignature } from "../tpk-confirm-modal.gts";
import TpkConfirmModalComponent from "../tpk-confirm-modal.gts";
import type { TOC } from "@ember/component/template-only";

export interface TpkConfirmModalPrefabSignature{
  Args: TpkConfirmModalSignature["Args"] & {
    onClose: () => void;
    cancelText: string;
    confirmText: string;
    icon: string;
    isOpen: boolean;
  };
  Blocks: {
    default: [
      WithBoundArgs<typeof TpkConfirmModalComponent, 'onClose' | 'onConfirm' | 'confirmQuestion' | 'isOpen' | 'outsideClickHandler'>,

    ];
  };
  Element: HTMLDivElement;
}

const TpkConfirmModalPrefabComponent: TOC<TpkConfirmModalPrefabSignature> = <template>
    <TpkConfirmModalComponent
      class='tpk-confirm-modal-container'
      @onClose={{@onClose}}
      @onConfirm={{@onConfirm}}
      @cancelText={{@cancelText}}
      @confirmText={{@confirmText}}
      @confirmQuestion={{@confirmQuestion}}
      @isOpen={{@isOpen}}
      @outsideClickHandler={{@outsideClickHandler}}
      data-test-confirm-modal-container
      ...attributes
      as |M|
    >
      <M.Cancel @icon={{@icon}} @cancelText={{@cancelText}}/>
      <M.Confirm @confirmText={{@confirmText}}/>
    </TpkConfirmModalComponent>
  </template>
  
export default TpkConfirmModalPrefabComponent;