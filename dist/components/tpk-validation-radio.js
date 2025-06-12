import { _ as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import TpkRadio from '@triptyk/ember-input/components/tpk-radio';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationRadioComponent;
let TpkValidationRadioComponent = (_class = (_TpkValidationRadioComponent = class TpkValidationRadioComponent extends BaseValidationComponent {
  onChange(value) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    const changeset = this.args.changeset.set(this.args.validationField, value);
    return changeset;
  }
  get value() {
    return this.args.value;
  }
  get name() {
    return this.args.validationField;
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkRadio @selected={{@selected}} @value={{@value}} @name={{this.name}} @label={{@label}} @changeEvent={{@changeEvent}} @disabled={{@disabled}} @onChange={{this.onChange}} as |I|>\n      {{yield (hash Input=I.Input Label=I.Label errors=this.errors hasError=this.hasError firstError=this.firstError)}}\n    </TpkRadio>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkRadio,
    hash
  })
}), _TpkValidationRadioComponent), _TpkValidationRadioComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationRadioComponent as default };
//# sourceMappingURL=tpk-validation-radio.js.map
