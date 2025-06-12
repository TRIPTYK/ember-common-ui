import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseValidationComponent } from './base.js';
import TpkInput from '@triptyk/ember-input/components/tpk-input';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TpkValidationInputComponent;
let TpkValidationInputComponent = (_class = (_TpkValidationInputComponent = class TpkValidationInputComponent extends BaseValidationComponent {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "showPassword", _descriptor, this);
  }
  onChange(value, e) {
    if (this.args.onChange) {
      return this.args.onChange(value, e);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }
  get value() {
    return super.value;
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkInput @value={{this.value}} @disabled={{@disabled}} @label={{@label}} @type={{@type}} @step={{@step}} @min={{@min}} @max={{@max}} @onChange={{this.onChange}} @changeEvent={{@changeEvent}} @mask={{@mask}} @maskOptions={{@maskOptions}} @unmaskValue={{@unmaskValue}} @placeholder={{@placeholder}} as |I|>\n      {{yield (hash Input=I.Input Label=I.Label errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n    </TpkInput>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkInput,
    hash
  })
}), _TpkValidationInputComponent), _TpkValidationInputComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "showPassword", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationInputComponent as default };
//# sourceMappingURL=tpk-validation-input.js.map
