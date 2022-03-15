import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import Component from '@glimmer/component';

interface UiModalArgs {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  coverClass: string;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class UiModal extends Component<UiModalArgs> {
  constructor(owner: unknown, args: UiModalArgs) {
    super(owner, args);
    if (!args.onClose) {
      console.warn('Modal initialized without @onClose');
    }
  }

  get modalKey(): string {
    const config = (getOwner(this) as ApplicationInstance).resolveRegistration(
      'config:environment'
    ) as Record<string, any>;
    return config.modal?.id ?? 'tpk-modal';
  }

  get modalContainer(): Element {
    const element = document.getElementById(this.modalKey);
    if (!element) throw new Error(`Modal container ${this.modalKey} not found`);

    return element;
  }
}
