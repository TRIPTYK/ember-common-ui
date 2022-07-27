import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import DialogLayer from '../services/dialog-layer';
import { guidFor } from '@ember/object/internals';

export interface UiModalArgs {
  isOpen: boolean;
  onClose: () => unknown;
  outsideClickHandler?: (e: PointerEvent) => unknown;
  // used for ARIA
  title: string;
  classless: boolean;
}

export default class UiModal extends Component<UiModalArgs> {
  @service declare dialogLayer: DialogLayer;

  guid = guidFor(this);

  constructor(owner: unknown, args: UiModalArgs) {
    super(owner, args);
    assert('Modal initialized without @onClose', args.onClose !== undefined);
    assert('Modal @title is mandatory', args.title !== undefined);
  }

  get isOnTop() {
    return this.dialogLayer.hasOpenChild(this.guid) === false;
  }

  handleEscapeKey = modifier(
    (_element, [isOpen, onClose]: [boolean, () => void]) => {
      let handler = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') return;
        if (!isOpen) return;

        if (this.isOnTop) {
          event.preventDefault();
          event.stopImmediatePropagation();
          onClose();
        }
      };

      window.addEventListener('keyup', handler);

      return () => {
        window.removeEventListener('keyup', handler);
      };
    },
    { eager: false }
  );

  @action
  outsideClickHandler(e: PointerEvent) {
    if (!this.isOnTop) return;
    if (this.args.outsideClickHandler) {
      if (this.args.outsideClickHandler(e)) {
        return this.args.onClose();
      }
      return;
    }
    return this.args.onClose();
  }

  @action
  updateStack() {
    this.dialogLayer.add(this.guid);
  }

  @action
  willDestroyNode(): void {
    this.dialogLayer.remove(this.guid);
    return super.willDestroy();
  }

  @action
  close() {
    if (!this.isOnTop) return;
    this.args.onClose();
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
