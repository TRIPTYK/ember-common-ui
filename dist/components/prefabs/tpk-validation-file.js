import '@ember/debug';
import '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrors from './tpk-validation-errors.js';
import MandatoryLabel from './mandatory-label.js';
import templateOnly from '@ember/component/template-only';
import TpkValidationFile from '../tpk-validation-file.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const TpkValidationFilePrefab = setComponentTemplate(precompileTemplate("<TpkValidationFile @label={{@label}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @onChange={{@onChange}} @mandatory={{@mandatory}} @validationField={{@validationField}} @changeset={{@changeset}} @requiredFields={{@requiredFields}} as |V|>\n  <V.Label class=\"tpk-file-container\" data-has-error=\"{{V.hasError}}\" {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} data-test-tpk-prefab-file-container={{@validationField}} ...attributes>\n    <MandatoryLabelComponent @label={{@label}} class=\"tpk-label\" />\n    <V.Input class=\"tpk-file-input\" data-test-tpk-file-input />\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </V.Label>\n</TpkValidationFile>", {
  strictMode: true,
  scope: () => ({
    TpkValidationFile,
    MandatoryLabelComponent: MandatoryLabel,
    TpkValidationErrorsComponent: TpkValidationErrors
  })
}), templateOnly());

export { TpkValidationFilePrefab as default };
//# sourceMappingURL=tpk-validation-file.js.map
