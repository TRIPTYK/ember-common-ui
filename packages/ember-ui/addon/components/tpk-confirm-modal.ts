import Component from '@glimmer/component';

export interface ModalConfirmArgs {
  onClose: (e: Event) => unknown;
  onConfirm: (e: Event) => unknown;
  confirmQuestion: string;
  isOpen?: boolean;
  classless?: boolean;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class ModalConfirm extends Component<ModalConfirmArgs> {}
