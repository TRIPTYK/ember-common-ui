import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty, _ as _defineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import '../services/dialog-layer.js';
import { guidFor } from '@ember/object/internals';
import TpkModalContentComponent from './tpk-modal/content.js';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TpkModalComponent;
let TpkModalComponent = (_class = (_TpkModalComponent = class TpkModalComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "dialogLayer", _descriptor, this);
    _defineProperty(this, "guid", guidFor(this));
    _defineProperty(this, "handleEscapeKey", modifier((_element, [isOpen, onClose]) => {
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
    }));
    assert('Modal initialized without @onClose', args.onClose !== undefined);
    assert('Modal @title is mandatory', args.title !== undefined);
  }
  get isOnTop() {
    return this.dialogLayer.hasOpenChild(this.guid) === false;
  }
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
  updateStack() {
    this.dialogLayer.add(this.guid);
  }
  willDestroyNode() {
    this.dialogLayer.remove(this.guid);
    return super.willDestroy();
  }
  close() {
    if (!this.isOnTop) return;
    this.args.onClose();
  }
  get modalKey() {
    const config = getOwner(this).resolveRegistration('config:environment');
    return config['modal']?.id ?? 'tpk-modal';
  }
  get modalContainer() {
    const element = document.getElementById(this.modalKey);
    if (!element) throw new Error(`Modal container ${this.modalKey} not found`);
    return element;
  }
}, setComponentTemplate(precompileTemplate("\n    {{#if @isOpen}}\n      {{#in-element this.modalContainer insertBefore=null}}\n        <div {{this.handleEscapeKey @isOpen this.close}} {{didInsert this.updateStack}} {{willDestroy this.willDestroyNode}} class=\"tpk-modal\" ...attributes>\n          {{yield (hash Content=(component TpkModalContentComponent title=@title onClose=this.close outsideClickHandler=this.outsideClickHandler) isOpen=@isOpen isOnTop=this.isOnTop onClose=this.close guid=this.guid)}}\n        </div>\n      {{/in-element}}\n    {{/if}}\n  ", {
  strictMode: true,
  scope: () => ({
    didInsert,
    willDestroy,
    hash,
    TpkModalContentComponent
  })
}), _TpkModalComponent), _TpkModalComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "dialogLayer", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "outsideClickHandler", [action], Object.getOwnPropertyDescriptor(_class.prototype, "outsideClickHandler"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateStack", [action], Object.getOwnPropertyDescriptor(_class.prototype, "updateStack"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroyNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroyNode"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "close", [action], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype), _class);

export { TpkModalComponent as default };
//# sourceMappingURL=tpk-modal.js.map
