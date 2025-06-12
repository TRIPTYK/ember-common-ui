import TpkValidationInputComponent from '../tpk-validation-input.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkValidationNumberPrefabComponent;
class TpkValidationNumberPrefabComponent extends Component {
  get min() {
    return this.args.unsigned ? 0 : this.args.min;
  }
}
_TpkValidationNumberPrefabComponent = TpkValidationNumberPrefabComponent;
setComponentTemplate(precompileTemplate("\n    <TpkValidationInputComponent @type=\"number\" @label={{@label}} @min={{this.min}} @step={{@step}} @disabled={{@disabled}} @mandatory={{@mandatory}} @changeEvent={{@changeEvent}} @onChange={{@onChange}} @placeholder={{@placeholder}} @validationField={{@validationField}} @changeset={{@changeset}} @requiredFields={{@requiredFields}} as |V|>\n      <V.Label class=\"tpk-number-container\" data-test-tpk-prefab-number-container data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} ...attributes>\n        <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n        <V.Input class=\"tpk-number-input\" data-test-tpk-number-input />\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n      </V.Label>\n    </TpkValidationInputComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationInputComponent,
    MandatoryLabelComponent,
    TpkValidationErrorsComponent
  })
}), _TpkValidationNumberPrefabComponent);

export { TpkValidationNumberPrefabComponent as default };
//# sourceMappingURL=tpk-validation-number.js.map
