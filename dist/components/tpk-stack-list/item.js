import { hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class StackListItemComponent extends Component {
  static {
    g(this.prototype, "isExpanded", [tracked], function () {
      return true;
    });
  }
  #isExpanded = (i(this, "isExpanded"), void 0);
  constructor(owner, args) {
    super(owner, args);
  }
  get index() {
    return 40 - this.args.zIndex;
  }
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
  static {
    n(this.prototype, "toggleExpanded", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-inline-styles --}}\n{{!-- template-lint-disable style-concatenation --}}\n<div data-test-stackList-item={{@index}} class=\"tpk-stack\" style=\"z-index: {{this.index}}\" ...attributes>\n  {{yield (hash toggleExpanded=this.toggleExpanded isExpanded=this.isExpanded)}}\n</div>", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { StackListItemComponent as default };
//# sourceMappingURL=item.js.map
