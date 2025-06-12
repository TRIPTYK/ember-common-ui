import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _StackListItemComponent;
let StackListItemComponent = (_class = (_StackListItemComponent = class StackListItemComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "isExpanded", _descriptor, this);
  }
  get index() {
    return 40 - this.args.zIndex;
  }
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}, setComponentTemplate(precompileTemplate("\n    <div data-test-stackList-item={{@index}} class=\"tpk-stack\" style=\"z-index: {{this.index}}\" ...attributes>\n      {{yield (hash toggleExpanded=this.toggleExpanded isExpanded=this.isExpanded)}}\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    hash
  })
}), _StackListItemComponent), _StackListItemComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "isExpanded", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _applyDecoratedDescriptor(_class.prototype, "toggleExpanded", [action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleExpanded"), _class.prototype), _class);

export { StackListItemComponent as default };
//# sourceMappingURL=item.js.map
