import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseValidationComponent } from './base.js';
import TpkInput from '@triptyk/ember-input/components/tpk-input';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class TpkValidationInputComponent extends BaseValidationComponent {
  static {
    g(this.prototype, "showPassword", [tracked], function () {
      return false;
    });
  }
  #showPassword = (i(this, "showPassword"), void 0);
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
    return super.value;
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkInput @value={{this.value}} @disabled={{@disabled}} @label={{@label}} @type={{@type}} @step={{@step}} @min={{@min}} @max={{@max}} @onChange={{this.onChange}} @changeEvent={{@changeEvent}} @mask={{@mask}} @maskOptions={{@maskOptions}} @unmaskValue={{@unmaskValue}} @placeholder={{@placeholder}} as |I|>\n  {{yield (hash Input=I.Input Label=I.Label errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n</TpkInput>", {
      strictMode: true,
      scope: () => ({
        TpkInput,
        hash
      })
    }), this);
  }
}

export { TpkValidationInputComponent as default };
//# sourceMappingURL=tpk-validation-input.js.map
