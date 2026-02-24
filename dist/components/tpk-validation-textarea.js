import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import TpkTextarea from '@triptyk/ember-input/components/tpk-textarea';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationTextareaComponent extends BaseValidationComponent {
  onChange(value, e) {
    if (this.args.onChange) {
      return this.args.onChange(value, e);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  get value() {
    return super.value?.toString();
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkTextarea @value={{this.value}} @label={{@label}} @disabled={{@disabled}} @maxLength={{@maxLength}} @changeEvent={{@changeEvent}} @onChange={{this.onChange}} as |I|>\n  {{yield (hash Input=I.Input Label=I.Label charCount=I.charCount errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n</TpkTextarea>", {
      strictMode: true,
      scope: () => ({
        TpkTextarea,
        hash
      })
    }), this);
  }
}

export { TpkValidationTextareaComponent as default };
//# sourceMappingURL=tpk-validation-textarea.js.map
