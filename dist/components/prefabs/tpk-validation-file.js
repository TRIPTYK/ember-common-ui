import '@ember/debug';
import '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import templateOnly from '@ember/component/template-only';
import TpkValidationFileComponent from '../tpk-validation-file.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const TpkValidationFilePrefabComponent = setComponentTemplate(precompileTemplate("\n    <TpkValidationFileComponent @label={{@label}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @onChange={{@onChange}} @mandatory={{@mandatory}} @validationField={{@validationField}} @changeset={{@changeset}} @requiredFields={{@requiredFields}} as |V|>\n      <V.Label class=\"tpk-file-container\" data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} data-test-tpk-prefab-file-container ...attributes>\n        <MandatoryLabelComponent @label={{@label}} class=\"tpk-label\" />\n        <V.Input class=\"tpk-file-input\" data-test-tpk-file-input />\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n      </V.Label>\n    </TpkValidationFileComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationFileComponent,
    MandatoryLabelComponent,
    TpkValidationErrorsComponent
  })
}), templateOnly());

export { TpkValidationFilePrefabComponent as default };
//# sourceMappingURL=tpk-validation-file.js.map
