import Component from '@glimmer/component';

interface TpkConfirmModalCancelComponentSignature {
  Args: {
    onClose: (...args: unknown[]) => unknown;
    action: string;
    icon: string;
    label: string;
  };
  Element: HTMLButtonElement;
  Blocks: {
    default: [];
  };
}

export default class TpkConfirmModalCancelComponent extends Component<TpkConfirmModalCancelComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-confirm-modal/cancel': typeof TpkConfirmModalCancelComponent;
  }
}
