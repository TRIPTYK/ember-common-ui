import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkActionsMenuElementComponent;
class TpkActionsMenuElementComponent extends Component {
  get handleAction() {
    assert('@handleAction is mandatory', typeof this.args.handleAction === 'function');
    return this.args.handleAction;
  }
  get action() {
    assert('@action is mandatory', typeof this.args.action === 'function');
    return this.args.action;
  }
}
_TpkActionsMenuElementComponent = TpkActionsMenuElementComponent;
setComponentTemplate(precompileTemplate("\n    <li ...attributes>\n      <button {{on \"click\" (fn this.handleAction this.action)}} type=\"button\">\n        {{#if @icon}}\n          <img src={{@icon}} class=\"w-6\" alt />\n        {{/if}}\n        {{yield}}\n      </button>\n    </li>\n  ", {
  strictMode: true,
  scope: () => ({
    on,
    fn
  })
}), _TpkActionsMenuElementComponent);

export { TpkActionsMenuElementComponent as default };
//# sourceMappingURL=element.js.map
