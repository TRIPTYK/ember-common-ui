import type { WithBoundArgs } from '@glint/template';
import TpkConfirmModalConfirmComponent from './tpk-confirm-modal/confirm';
import TpkConfirmModalCancelComponent from './tpk-confirm-modal/cancel';
import { hash } from '@ember/helper';
import { TOC } from '@ember/component/template-only';
import TpkModal from './tpk-modal';

export interface TpkConfirmModalSignature {
  Args: {
    onClose: () => unknown;
    onConfirm: (...args: unknown[]) => unknown;
    confirmQuestion: string;
    isOpen: boolean;
    outsideClickHandler: ((e: MouseEvent | TouchEvent) => unknown) | undefined;
    classless?: boolean;
    title: string;
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
        title: string;
      },
    ];
  };
}

const TpkConfirmModalComponent: TOC<TpkConfirmModalSignature> =
  <template>
    <TpkModal
      data-test-confirm-modal
      @title={{@title}}
      @isOpen={{@isOpen}}
      @outsideClickHandler={{@outsideClickHandler}}
      @onClose={{@onClose}}
      @classless={{@classless}}
      ...attributes
      as |Modal|
    >
      <Modal.Content>
        {{yield
          (hash
            title=@title
            Confirm=(component TpkConfirmModalConfirmComponent onConfirm=@onConfirm)
            Cancel=(component TpkConfirmModalCancelComponent onClose=@onClose)
          )
        }}
      </Modal.Content>
    </TpkModal>
  </template>

export default TpkConfirmModalComponent;
