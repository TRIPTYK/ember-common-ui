import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { action } from '@ember/object';
import { BaseUIComponent } from './base.js';
import TpkTextareaInputComponent from './tpk-textarea/input.js';
import { hash } from '@ember/helper';
import { tracked } from 'tracked-built-ins';
import TpkLabel from './tpk-label.js';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TpkTextareaComponent;
let TpkTextareaComponent = (_class = (_TpkTextareaComponent = class TpkTextareaComponent extends BaseUIComponent {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "charCount", _descriptor, this);
    assert('@label must be a string', typeof args.label === 'string');
  }
  onChange(e) {
    e.preventDefault();
    const {
      value
    } = e.target;
    this.args.onChange?.(value, e);
  }
  updateCharacterCount(e) {
    const {
      value
    } = e.target;
    this.charCount = value.length;
  }
  setupCharacterCount(e) {
    this.charCount = e.value.length;
  }
}, setComponentTemplate(precompileTemplate("\n    {{yield (hash Label=(component TpkLabel guid=this.guid label=@label) Input=(component TpkTextareaInputComponent guid=this.guid value=@value updateCharacterCount=this.updateCharacterCount setupCharacterCount=this.setupCharacterCount maxLength=@maxLength changeEvent=this.changeEvent placeholder=@placeholder disabled=@disabled onChange=this.onChange) charCount=this.charCount maxLength=@maxLength changeEvent=this.changeEvent guid=this.guid onChange=this.onChange)}}\n  ", {
  strictMode: true,
  scope: () => ({
    hash,
    TpkLabel,
    TpkTextareaInputComponent
  })
}), _TpkTextareaComponent), _TpkTextareaComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "charCount", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateCharacterCount", [action], Object.getOwnPropertyDescriptor(_class.prototype, "updateCharacterCount"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setupCharacterCount", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setupCharacterCount"), _class.prototype), _class);

export { TpkTextareaComponent as default };
//# sourceMappingURL=tpk-textarea.js.map
