import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TpkActionsMenuElementComponent from './tpk-actions-menu/element.js';
import { on } from '@ember/modifier';
import onClickOutside from 'ember-click-outside/modifiers/on-click-outside';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class TpkActionsMenuComponent extends Component {
  static {
    g(this.prototype, "isOpen", [tracked], function () {
      return false;
    });
  }
  #isOpen = (i(this, "isOpen"), void 0);
  get actionsMenuClass() {
    return this.isOpen ? 'actions aopened' : 'actions';
  }
  closeMenu() {
    this.isOpen = false;
  }
  static {
    n(this.prototype, "closeMenu", [action]);
  }
  handleKeyUp(e) {
    if (!this.isOpen) {
      return;
    }
    if (e.key === 'Escape') {
      this.isOpen = false;
    }
  }
  static {
    n(this.prototype, "handleKeyUp", [action]);
  }
  handleAction(action, e) {
    e.stopImmediatePropagation();
    this.isOpen = false;
    action(e);
  }
  static {
    n(this.prototype, "handleAction", [action]);
  }
  toggle(e) {
    e.stopImmediatePropagation();
    this.isOpen = !this.isOpen;
  }
  static {
    n(this.prototype, "toggle", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-invalid-interactive --}}\n<div class={{this.actionsMenuClass}} data-test-actions-menu {{!-- @glint-ignore --}} {{onClickOutside this.closeMenu}} {{on \"keyup\" this.handleKeyUp}} ...attributes>\n  <button type=\"button\" class=\"open_actions\" {{on \"click\" this.toggle}} title=\"actions\" data-test-actions-open-action>\n    <img src=\"/assets/icons/kebab.svg\" alt=\"seeAllAction\" />\n  </button>\n  {{#if this.isOpen}}\n    <ul class=\"actions_list\">\n      {{yield (component TpkActionsMenuElementComponent handleAction=this.handleAction)}}\n    </ul>\n  {{/if}}\n</div>", {
      strictMode: true,
      scope: () => ({
        onClickOutside,
        on,
        TpkActionsMenuElementComponent
      })
    }), this);
  }
}

export { TpkActionsMenuComponent as default };
//# sourceMappingURL=tpk-actions-menu.js.map
