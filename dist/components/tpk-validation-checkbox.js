import { _ as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import { assert } from '@ember/debug';
import TpkCheckbox from '@triptyk/ember-input/components/tpk-checkbox';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationCheckboxComponent;
let TpkValidationCheckboxComponent = (_class = (_TpkValidationCheckboxComponent = class TpkValidationCheckboxComponent extends BaseValidationComponent {
  onChange(isChecked, value, e) {
    if (this.args.onChange) {
      return this.args.onChange(isChecked, value, e);
    }
    return this.args.changeset.set(this.args.validationField, isChecked);
  }
  get value() {
    assert('value must be a boolean or null or undefined', typeof super.value === 'boolean' || super.value === null || super.value === undefined);
    return super.value ?? false;
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkCheckbox @checked={{this.value}} @label={{@label}} @changeEvent={{@changeEvent}} @disabled={{@disabled}} @onChange={{this.onChange}} as |I|>\n      {{yield (hash Input=I.Input Label=I.Label errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n    </TpkCheckbox>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkCheckbox,
    hash
  })
}), _TpkValidationCheckboxComponent), _TpkValidationCheckboxComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationCheckboxComponent as default };
//# sourceMappingURL=tpk-validation-checkbox.js.map
