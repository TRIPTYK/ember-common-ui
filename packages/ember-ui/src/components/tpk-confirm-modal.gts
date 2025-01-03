import type { WithBoundArgs } from '@glint/template';
import TpkConfirmModalConfirmComponent from './tpk-confirm-modal/confirm.gts';
import TpkConfirmModalCancelComponent from './tpk-confirm-modal/cancel.gts';
import { hash } from '@ember/helper';
import type { TOC } from '@ember/component/template-only';
import TpkModal from './tpk-modal.gts';

export interface TpkConfirmModalSignature {
  Args: {
    onClose: () => unknown;
    onConfirm: (...args: unknown[]) => unknown;
    confirmQuestion: string;
    cancelText?: string;
    confirmText?: string;
    isOpen: boolean;
    outsideClickHandler?: ((e: MouseEvent | TouchEvent) => unknown) | undefined;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Confirm: WithBoundArgs<
          typeof TpkConfirmModalConfirmComponent,
          'onConfirm'
        >;
        Cancel: WithBoundArgs<typeof TpkConfirmModalCancelComponent, 'onClose'>;
      },
    ];
  };
}

const TpkConfirmModalComponent: TOC<TpkConfirmModalSignature> =
  <template>
    <TpkModal
      data-test-confirm-modal
      @isOpen={{@isOpen}}
      @outsideClickHandler={{@outsideClickHandler}}
      @onClose={{@onClose}}
      @title={{@confirmQuestion}}
      ...attributes
      as |Modal|
    >

      <Modal.Content>
        {{yield
          (hash
            Confirm=(component TpkConfirmModalConfirmComponent onConfirm=@onConfirm)
            Cancel=(component TpkConfirmModalCancelComponent onClose=@onClose)
          )
        }}
      </Modal.Content>
    </TpkModal>
  </template>

export default TpkConfirmModalComponent;
