import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiModalArgs {
  isOpen: boolean;
  onClose?: () => void;
  container?: string;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class UiModal extends Component<UiModalArgs> {
  guid = guidFor(this);

  constructor(owner: unknown, args: UiModalArgs) {
    super(owner, args);
    if (!args.onClose) {
      console.warn('Modal initialized without @onClose');
    }
  }

  get modalContainer(): Element {
    const containerSelector = this.args.container ?? '#tpk-modal-container';
    const element = document.querySelector(containerSelector);

    if (!element)
      throw new Error(`Modal container ${containerSelector} not found`);

    return element;
  }
}
