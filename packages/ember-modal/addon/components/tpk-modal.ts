import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import Component from '@glimmer/component';
import { action } from '@ember/object';

interface UiModalArgs {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  coverClass: string;
}

export default class UiModal extends Component<UiModalArgs> {
  constructor(owner: unknown, args: UiModalArgs) {
    super(owner, args);
    if (!args.onClose) {
      console.warn('Modal initialized without @onClose');
    }
  }

  @action
  onEscape() {}

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
