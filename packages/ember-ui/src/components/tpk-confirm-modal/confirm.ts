import Component from '@glimmer/component';

interface TpkConfirmModalConfirmComponentSignature {
  Args: {
    onConfirm: (...args: unknown[]) => unknown;
  };
  Element: HTMLButtonElement;
  Blocks: {
    default: [];
  };
}

export default class TpkConfirmModalConfirmComponent extends Component<TpkConfirmModalConfirmComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-confirm-modal/confirm': typeof TpkConfirmModalConfirmComponent;
  }
}
