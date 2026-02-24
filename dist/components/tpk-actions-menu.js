import { action } from '@ember/object';
import Component from '@glimmer/component';
import TpkActionsMenuElementComponent from './tpk-actions-menu/element.js';
import { guidFor } from '@ember/-internals/utils';
import EllipsisIcon from '../assets/icons/ellipsis.js';
import { on } from '@ember/modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkActionsMenuComponent extends Component {
  index = guidFor(this);
  stopPropagation(e) {
    e.stopImmediatePropagation();
  }
  handleAction(action, e) {
    e.stopImmediatePropagation();
    this.hidePopover(e);
    action(e);
  }
  static {
    n(this.prototype, "handleAction", [action]);
  }
  hidePopover(e) {
    const ulElement = e.target.closest('[popover]');
    if (ulElement) {
      ulElement.hidePopover();
    }
  }
  static {
    setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-invalid-interactive --}}\n{{!-- template-lint-disable no-inline-styles --}}\n{{!-- template-lint-disable style-concatenation --}}\n<div class=\"actions\" data-test-actions-menu ...attributes>\n  <button type=\"button\" class=\"open_actions\" popovertarget=\"popover-{{this.index}}\" style=\"anchor-name:--anchor-{{this.index}}\" {{on \"click\" this.stopPropagation}} data-test-actions-open-action>\n    <EllipsisIcon />\n  </button>\n  <ul class=\"actions_list\" popover id=\"popover-{{this.index}}\" style=\"position-anchor:--anchor-{{this.index}}\" data-test-actions-list>\n    {{yield (component TpkActionsMenuElementComponent handleAction=this.handleAction)}}\n  </ul>\n</div>", {
      strictMode: true,
      scope: () => ({
        on,
        EllipsisIcon,
        TpkActionsMenuElementComponent
      })
    }), this);
  }
}

export { TpkActionsMenuComponent as default };
//# sourceMappingURL=tpk-actions-menu.js.map
