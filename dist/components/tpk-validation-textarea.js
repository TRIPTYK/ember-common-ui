import { _ as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import TpkTextarea from '@triptyk/ember-input/components/tpk-textarea';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationTextareaComponent;
let TpkValidationTextareaComponent = (_class = (_TpkValidationTextareaComponent = class TpkValidationTextareaComponent extends BaseValidationComponent {
  onChange(value, e) {
    if (this.args.onChange) {
      return this.args.onChange(value, e);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }
  get value() {
    return super.value?.toString();
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkTextarea @value={{this.value}} @label={{@label}} @disabled={{@disabled}} @maxLength={{@maxLength}} @changeEvent={{@changeEvent}} @onChange={{this.onChange}} as |I|>\n      {{yield (hash Input=I.Input Label=I.Label charCount=I.charCount errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n    </TpkTextarea>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkTextarea,
    hash
  })
}), _TpkValidationTextareaComponent), _TpkValidationTextareaComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationTextareaComponent as default };
//# sourceMappingURL=tpk-validation-textarea.js.map
