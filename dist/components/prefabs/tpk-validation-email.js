import TpkValidationInput from '../tpk-validation-input.js';
import '@ember/debug';
import '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrors from './tpk-validation-errors.js';
import MandatoryLabel from './mandatory-label.js';
import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const TpkValidationEmailPrefab = setComponentTemplate(precompileTemplate("<TpkValidationInput @type=\"email\" @label={{@label}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @onChange={{@onChange}} @mandatory={{@mandatory}} @placeholder={{@placeholder}} @validationField={{@validationField}} @changeset={{@changeset}} @requiredFields={{@requiredFields}} as |V|>\n  <V.Label class=\"tpk-email-container\" data-test-tpk-prefab-email-container={{@validationField}} data-has-error=\"{{V.hasError}}\" {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} ...attributes>\n    <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n    <V.Input class=\"tpk-email-input\" data-test-tpk-email-input />\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </V.Label>\n</TpkValidationInput>", {
  strictMode: true,
  scope: () => ({
    TpkValidationInput,
    MandatoryLabelComponent: MandatoryLabel,
    TpkValidationErrorsComponent: TpkValidationErrors
  })
}), templateOnly());

export { TpkValidationEmailPrefab as default };
//# sourceMappingURL=tpk-validation-email.js.map
