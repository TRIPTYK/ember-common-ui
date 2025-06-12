import { _ as _applyDecoratedDescriptor } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import TpkValidationInputComponent from '../tpk-validation-input.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationIntegerComponent;
let TpkValidationIntegerComponent = (_class = (_TpkValidationIntegerComponent = class TpkValidationIntegerComponent extends Component {
  get min() {
    return this.args.unsigned ? 0 : this.args.min;
  }
  preventNonNumericInput(event) {
    if (event.key === "." || event.key === ",") {
      event.preventDefault();
    }
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkValidationInputComponent @type=\"number\" @label={{@label}} @min={{this.min}} @step={{1}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @onChange={{@onChange}} @placeholder={{@placeholder}} @mandatory={{@mandatory}} @validationField={{@validationField}} @changeset={{@changeset}} @requiredFields={{@requiredFields}} as |V|>\n      <V.Label class=\"tpk-integer-container\" data-test-tpk-prefab-integer-container data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} ...attributes>\n        <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n        <V.Input class=\"tpk-integer-input\" data-test-tpk-integer-input {{on \"keydown\" this.preventNonNumericInput}} />\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n      </V.Label>\n    </TpkValidationInputComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationInputComponent,
    MandatoryLabelComponent,
    on,
    TpkValidationErrorsComponent
  })
}), _TpkValidationIntegerComponent), _TpkValidationIntegerComponent), _applyDecoratedDescriptor(_class.prototype, "preventNonNumericInput", [action], Object.getOwnPropertyDescriptor(_class.prototype, "preventNonNumericInput"), _class.prototype), _class);

export { TpkValidationIntegerComponent as default };
//# sourceMappingURL=tpk-validation-integer.js.map
