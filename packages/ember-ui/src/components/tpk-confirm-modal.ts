import Component from '@glimmer/component';

export interface TpkConfirmModalSignature {
  Args: {
    onClose: (e: Event) => unknown;
    onConfirm: (e: Event) => unknown;
    confirmQuestion: string;
    isOpen?: boolean;
    classless?: boolean;
  };
}

export default class TpkConfirmModalComponent extends Component<TpkConfirmModalSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-confirm-modal': typeof TpkConfirmModalComponent;
  }
}
