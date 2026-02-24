import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import TpkRadio from '@triptyk/ember-input/components/tpk-radio';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationRadioComponent extends BaseValidationComponent {
  onChange(value) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    const changeset = this.args.changeset.set(this.args.validationField, value);
    return changeset;
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  get value() {
    return this.args.value;
  }
  get name() {
    return this.args.validationField;
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkRadio @selected={{@selected}} @value={{@value}} @name={{this.name}} @label={{@label}} @changeEvent={{@changeEvent}} @disabled={{@disabled}} @onChange={{this.onChange}} as |I|>\n  {{yield (hash Input=I.Input Label=I.Label errors=this.errors hasError=this.hasError firstError=this.firstError)}}\n</TpkRadio>", {
      strictMode: true,
      scope: () => ({
        TpkRadio,
        hash
      })
    }), this);
  }
}

export { TpkValidationRadioComponent as default };
//# sourceMappingURL=tpk-validation-radio.js.map
