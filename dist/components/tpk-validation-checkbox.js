import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import { assert } from '@ember/debug';
import TpkCheckbox from '@triptyk/ember-input/components/tpk-checkbox';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationCheckboxComponent extends BaseValidationComponent {
  onChange(isChecked, value, e) {
    if (this.args.onChange) {
      return this.args.onChange(isChecked, value, e);
    }
    return this.args.changeset.set(this.args.validationField, isChecked);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  get value() {
    assert('value must be a boolean or null or undefined', typeof super.value === 'boolean' || super.value === null || super.value === undefined);
    return super.value ?? false;
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkCheckbox @checked={{this.value}} @label={{@label}} @changeEvent={{@changeEvent}} @disabled={{@disabled}} @onChange={{this.onChange}} as |I|>\n  {{yield (hash Input=I.Input Label=I.Label errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n</TpkCheckbox>", {
      strictMode: true,
      scope: () => ({
        TpkCheckbox,
        hash
      })
    }), this);
  }
}

export { TpkValidationCheckboxComponent as default };
//# sourceMappingURL=tpk-validation-checkbox.js.map
