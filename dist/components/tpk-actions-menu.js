import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import TpkActionsMenuElementComponent from './tpk-actions-menu/element.js';
import { on } from '@ember/modifier';
import onClickOutside from 'ember-click-outside/modifiers/on-click-outside';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TpkActionsMenuComponent;
let TpkActionsMenuComponent = (_class = (_TpkActionsMenuComponent = class TpkActionsMenuComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isOpen", _descriptor, this);
  }
  get actionsMenuClass() {
    return this.isOpen ? 'actions aopened' : 'actions';
  }
  closeMenu() {
    this.isOpen = false;
  }
  handleKeyUp(e) {
    if (!this.isOpen) {
      return;
    }
    if (e.key === 'Escape') {
      this.isOpen = false;
    }
  }
  handleAction(action, e) {
    e.stopImmediatePropagation();
    this.isOpen = false;
    action(e);
  }
  toggle(e) {
    e.stopImmediatePropagation();
    this.isOpen = !this.isOpen;
  }
}, setComponentTemplate(precompileTemplate("\n    {{!-- template-lint-disable no-invalid-interactive --}}\n    <div class={{this.actionsMenuClass}} data-test-actions-menu {{!-- @glint-ignore --}} {{onClickOutside this.closeMenu}} {{on \"keyup\" this.handleKeyUp}} ...attributes>\n      <button type=\"button\" class=\"open_actions\" {{on \"click\" this.toggle}} title=\"actions\" data-test-actions-open-action>\n        <img src=\"/assets/icons/kebab.svg\" alt=\"seeAllAction\" />\n      </button>\n      {{#if this.isOpen}}\n        <ul class=\"actions_list\">\n          {{yield (component TpkActionsMenuElementComponent handleAction=this.handleAction)}}\n        </ul>\n      {{/if}}\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    onClickOutside,
    on,
    TpkActionsMenuElementComponent
  })
}), _TpkActionsMenuComponent), _TpkActionsMenuComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "isOpen", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "closeMenu", [action], Object.getOwnPropertyDescriptor(_class.prototype, "closeMenu"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleKeyUp", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleKeyUp"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleAction", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleAction"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggle", [action], Object.getOwnPropertyDescriptor(_class.prototype, "toggle"), _class.prototype), _class);

export { TpkActionsMenuComponent as default };
//# sourceMappingURL=tpk-actions-menu.js.map
