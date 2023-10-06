import Component from '@glimmer/component';
import { WithBoundArgs } from '@glint/template';
import TpkConfirmModalConfirmComponent from './tpk-confirm-modal/confirm';
import TpkConfirmModalCancelComponent from './tpk-confirm-modal/cancel';

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

export default class TpkConfirmModalComponent extends Component<TpkConfirmModalSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-confirm-modal': typeof TpkConfirmModalComponent;
  }
}
