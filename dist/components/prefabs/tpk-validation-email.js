import TpkValidationInputComponent from '../tpk-validation-input.js';
import '@ember/debug';
import '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const TpkValidationEmailPrefabComponent = setComponentTemplate(precompileTemplate("\n    <TpkValidationInputComponent @type=\"email\" @label={{@label}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @onChange={{@onChange}} @mandatory={{@mandatory}} @placeholder={{@placeholder}} @validationField={{@validationField}} @changeset={{@changeset}} @requiredFields={{@requiredFields}} as |V|>\n        <V.Label class=\"tpk-email-container\" data-test-tpk-prefab-email-container data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} ...attributes>\n          <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n          <V.Input class=\"tpk-email-input\" data-test-tpk-email-input />\n          <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n         </V.Label>\n    </TpkValidationInputComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationInputComponent,
    MandatoryLabelComponent,
    TpkValidationErrorsComponent
  })
}), templateOnly());

export { TpkValidationEmailPrefabComponent as default };
//# sourceMappingURL=tpk-validation-email.js.map
