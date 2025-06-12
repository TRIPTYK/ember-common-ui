import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkStackListTitleComponent;
class TpkStackListTitleComponent extends Component {
  get isNotExpanded() {
    return this.args.isExpanded !== true;
  }
}
_TpkStackListTitleComponent = TpkStackListTitleComponent;
setComponentTemplate(precompileTemplate("\n    <span class=\"tpk-stack-title\" data-test-title-stackList-item>\n      {{#if this.isNotExpanded}}\n        {{yield (hash item=@item)}}\n      {{/if}}\n    </span>\n  ", {
  strictMode: true,
  scope: () => ({
    hash
  })
}), _TpkStackListTitleComponent);

export { TpkStackListTitleComponent as default };
//# sourceMappingURL=title.js.map
