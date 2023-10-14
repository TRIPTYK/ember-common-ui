import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import DialogLayerService from '../services/dialog-layer';
import { guidFor } from '@ember/object/internals';
import { WithBoundArgs } from '@glint/template';
import type TpkModalContentComponent from './tpk-modal/content';

export interface TpkModalComponentArgs {
  isOpen: boolean;
  onClose: () => unknown;
  outsideClickHandler?: (e: MouseEvent | TouchEvent) => unknown;
  title: string;
  classless?: boolean;
}

interface TpkModalEnv {
  modal: {
    id?: string;
  };
}

export interface TpkModalComponentSignature {
  Args: TpkModalComponentArgs;
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Content: WithBoundArgs<
          typeof TpkModalContentComponent,
          'title' | 'onClose' | 'classless' | 'outsideClickHandler'
        >;
        title: string;
        isOnTop: boolean;
        isOpen: boolean;
        onClose: () => unknown;
        classless?: boolean;
        guid: string;
      },
    ];
  };
}

export default class TpkModalComponent extends Component<TpkModalComponentSignature> {
  @service declare dialogLayer: DialogLayerService;

  guid = guidFor(this);

  constructor(owner: unknown, args: TpkModalComponentArgs) {
    super(owner, args);
    assert('Modal initialized without @onClose', args.onClose !== undefined);
    assert('Modal @title is mandatory', args.title !== undefined);
  }

  get isOnTop() {
    return this.dialogLayer.hasOpenChild(this.guid) === false;
  }

  handleEscapeKey = modifier(
    (_element, [isOpen, onClose]: [boolean, () => void]) => {
      const handler = (event: KeyboardEvent) => {
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
  );

  @action
  outsideClickHandler(e: MouseEvent | TouchEvent) {
    if (!this.isOnTop) return false;
    if (this.args.outsideClickHandler) {
      if (!this.args.outsideClickHandler(e)) {
        this.args.onClose();
        return false;
      }
      return true;
    }
    this.args.onClose();
    return false;
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
      'config:environment',
    ) as TpkModalEnv;
    return config['modal']?.id ?? 'tpk-modal';
  }

  get modalContainer(): Element {
    const element = document.getElementById(this.modalKey);
    if (!element) throw new Error(`Modal container ${this.modalKey} not found`);

    return element;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-modal': typeof TpkModalComponent;
    TpkModal: typeof TpkModalComponent;
  }
}
