import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import IMask from 'imask';
import { modifier } from 'ember-modifier';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class TpkInputInputComponent extends Component {
  static {
    g(this.prototype, "mask", [tracked]);
  }
  #mask = (i(this, "mask"), void 0);
  constructor(owner, args) {
    super(owner, args);
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
  static {
    n(this.prototype, "onChange", [action]);
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
  static {
    n(this.prototype, "setMask", [action]);
  }
  setupMask = modifier(element => {
    this.setMask(element);
  });
  static {
    setComponentTemplate(precompileTemplate("<input id={{@guid}} min={{@min}} step={{@step}} max={{@max}} type={{@type}} value={{this.value}} disabled={{@disabled}} placeholder={{@placeholder}} {{this.setupMask @mask}} {{on @changeEvent this.onChange}} ...attributes data-test-tpk-input-input />", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { TpkInputInputComponent as default };
//# sourceMappingURL=input.js.map
