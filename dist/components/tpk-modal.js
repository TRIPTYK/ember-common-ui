import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import '@ember/reactive/collections';
import { guidFor } from '@ember/object/internals';
import TpkModalContentComponent from './tpk-modal/content.js';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class TpkModalComponent extends Component {
  static {
    g(this.prototype, "dialogLayer", [service]);
  }
  #dialogLayer = (i(this, "dialogLayer"), void 0);
  guid = guidFor(this);
  modalKey;
  constructor(owner, args) {
    super(owner, args);
    assert('Modal initialized without @onClose', args.onClose !== undefined);
    assert('Modal @title is mandatory', args.title !== undefined);
    this.modalKey = this.loadModalKey(owner);
    this.updateStack();
  }
  get isOnTop() {
    return this.dialogLayer.hasOpenChild(this.guid) === false;
  }
  handleEscapeKey = modifier((_element, [isOpen, onClose]) => {
    const handler = event => {
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
  });
  outsideClickHandler(e) {
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
  static {
    n(this.prototype, "outsideClickHandler", [action]);
  }
  updateStack = () => {
    this.dialogLayer.add(this.guid);
  };
  willDestroyNode = () => {
    this.dialogLayer.remove(this.guid);
    return super.willDestroy();
  };
  close() {
    if (!this.isOnTop) return;
    this.args.onClose();
  }
  static {
    n(this.prototype, "close", [action]);
  }
  loadModalKey(owner) {
    const config = owner.resolveRegistration('config:environment');
    return config['modal']?.id ?? 'tpk-modal';
  }
  get modalContainer() {
    const element = document.getElementById(this.modalKey);
    if (!element) throw new Error(`Modal container ${this.modalKey} not found`);
    return element;
  }
  willDestroy() {
    this.willDestroyNode();
    super.willDestroy();
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if @isOpen}}\n  {{#in-element this.modalContainer insertBefore=null}}\n    <dialog {{this.handleEscapeKey @isOpen this.close}} class=\"tpk-modal\" ...attributes>\n      {{yield (hash Content=(component TpkModalContentComponent title=@title onClose=this.close outsideClickHandler=this.outsideClickHandler) isOpen=@isOpen isOnTop=this.isOnTop onClose=this.close guid=this.guid)}}\n    </dialog>\n  {{/in-element}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash,
        TpkModalContentComponent
      })
    }), this);
  }
}

export { TpkModalComponent as default };
//# sourceMappingURL=tpk-modal.js.map
