import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkStackListTitleComponent extends Component {
  get isNotExpanded() {
    return this.args.isExpanded !== true;
  }
  static {
    setComponentTemplate(precompileTemplate("<span class=\"tpk-stack-title\" data-test-title-stackList-item>\n  {{#if this.isNotExpanded}}\n    {{yield (hash item=@item)}}\n  {{/if}}\n</span>", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { TpkStackListTitleComponent as default };
//# sourceMappingURL=title.js.map
