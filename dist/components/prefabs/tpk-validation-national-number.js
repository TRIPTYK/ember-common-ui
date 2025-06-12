import { a as _defineProperty } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import TpkValidationInputComponent from '../tpk-validation-input.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkValidationNationalNumberPrefabComponent;
class TpkValidationNationalNumberPrefabComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "mask", "00.00.00-000.00");
  }
}
_TpkValidationNationalNumberPrefabComponent = TpkValidationNationalNumberPrefabComponent;
setComponentTemplate(precompileTemplate("\n    <TpkValidationInputComponent @label={{@label}} @type=\"text\" @onChange={{@onChange}} @validationField={{@validationField}} @mandatory={{@mandatory}} @changeEvent={{@changeEvent}} @disabled={{@disabled}} @changeset={{@changeset}} @mask={{this.mask}} @requiredFields={{@requiredFields}} as |V|>\n      <V.Label class=\"tpk-national-number-container\" data-test-tpk-prefab-national-number-container data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} ...attributes>\n          <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n          <V.Input class=\"tpk-national-number-input\" data-test-tpk-national-number-input />\n          <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n      </V.Label>\n    </TpkValidationInputComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationInputComponent,
    MandatoryLabelComponent,
    TpkValidationErrorsComponent
  })
}), _TpkValidationNationalNumberPrefabComponent);

export { TpkValidationNationalNumberPrefabComponent as default };
//# sourceMappingURL=tpk-validation-national-number.js.map
