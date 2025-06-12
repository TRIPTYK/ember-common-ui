import TpkValidationCheckboxComponent from '../tpk-validation-checkbox.js';
import '@ember/debug';
import '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const TpkValidationCheckboxPrefabComponent = setComponentTemplate(precompileTemplate("\n    <TpkValidationCheckboxComponent @label={{@label}} @changeset={{@changeset}} @validationField={{@validationField}} @changeEvent={{@changeEvent}} @mandatory={{@mandatory}} @disabled={{@disabled}} @onChange={{@onChange}} @requiredFields={{@requiredFields}} as |V|>\n        <V.Label class=\"tpk-checkbox-container\" data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} ...attributes data-test-tpk-prefab-checkbox-container>\n          <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n          <V.Input class=\"tpk-checkbox-input\" data-test-tpk-checkbox-input />\n          <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n        </V.Label>\n     \n    </TpkValidationCheckboxComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationCheckboxComponent,
    MandatoryLabelComponent,
    TpkValidationErrorsComponent
  })
}), templateOnly());

export { TpkValidationCheckboxPrefabComponent as default };
//# sourceMappingURL=tpk-validation-checkbox.js.map
