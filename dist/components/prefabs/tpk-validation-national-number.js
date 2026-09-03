import TpkValidationInput from '../tpk-validation-input.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrors from './tpk-validation-errors.js';
import MandatoryLabel from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkValidationNationalNumberPrefab extends Component {
  mask = '00.00.00-000.00';
  static {
    setComponentTemplate(precompileTemplate("<TpkValidationInput @label={{@label}} @type=\"text\" @onChange={{@onChange}} @validationField={{@validationField}} @mandatory={{@mandatory}} @changeEvent={{@changeEvent}} @disabled={{@disabled}} @changeset={{@changeset}} @mask={{this.mask}} @requiredFields={{@requiredFields}} as |V|>\n  <V.Label class=\"tpk-national-number-container\" data-test-tpk-prefab-national-number-container={{@validationField}} data-has-error=\"{{V.hasError}}\" {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} ...attributes>\n    <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n    <V.Input class=\"tpk-national-number-input\" data-test-tpk-national-number-input />\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </V.Label>\n</TpkValidationInput>", {
      strictMode: true,
      scope: () => ({
        TpkValidationInput,
        MandatoryLabelComponent: MandatoryLabel,
        TpkValidationErrorsComponent: TpkValidationErrors
      })
    }), this);
  }
}

export { TpkValidationNationalNumberPrefab as default };
//# sourceMappingURL=tpk-validation-national-number.js.map
