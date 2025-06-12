import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import didUpdate from '@ember/render-modifiers/modifiers/did-update';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import IMask from 'imask';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TpkInputInputComponent;
let TpkInputInputComponent = (_class = (_TpkInputInputComponent = class TpkInputInputComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "mask", _descriptor, this);
  }
  get value() {
    if (this.mask) {
      return this.mask.displayValue;
    }
    return this.args.value;
  }
  onChange(e) {
    e.preventDefault();
    let value = this.inputValue(e.target);
    if (this.mask) {
      value = this.args.unmaskValue ? this.mask.typedValue : this.mask.value;
    }
    this.args.onChange?.(value, e);
  }
  inputValue(input) {
    if (this.args.type === 'number') {
      return input.valueAsNumber;
    }
    if (this.args.type === 'date') {
      return input.valueAsDate;
    }
    return input.value;
  }
  setMask(element) {
    if (!this.args.mask) return;
    this.mask = IMask(element, {
      mask: this.args.mask,
      ...this.args.maskOptions
    });
  }
}, setComponentTemplate(precompileTemplate("\n    <input id={{@guid}} min={{@min}} step={{@step}} max={{@max}} type={{@type}} value={{this.value}} disabled={{@disabled}} placeholder={{@placeholder}} {{didInsert this.setMask}} {{didUpdate this.setMask @mask}} {{on @changeEvent this.onChange}} ...attributes data-test-tpk-input-input />\n  ", {
  strictMode: true,
  scope: () => ({
    didInsert,
    didUpdate,
    on
  })
}), _TpkInputInputComponent), _TpkInputInputComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "mask", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setMask", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setMask"), _class.prototype), _class);

export { TpkInputInputComponent as default };
//# sourceMappingURL=input.js.map
