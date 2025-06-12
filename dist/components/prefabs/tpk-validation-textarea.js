import TpkValidationTextareaComponent from '../tpk-validation-textarea.js';
import '@ember/debug';
import '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const TpkValidationTextareaPrefabComponent = setComponentTemplate(precompileTemplate("\n    <TpkValidationTextareaComponent @label={{@label}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @onChange={{@onChange}} @mandatory={{@mandatory}} @placeholder={{@placeholder}} @validationField={{@validationField}} @changeset={{@changeset}} @maxLength={{@maxLength}} @requiredFields={{@requiredFields}} as |V|>\n      <V.Label class=\"tpk-textarea-container\" data-test-tpk-prefab-textarea-container data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} ...attributes>\n        <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n        <V.Input class=\"tpk-textarea-input\" data-test-tpk-textarea-input />\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n        {{#if @maxLength}}\n          <span class=\"tpk-textarea-character-count\">\n            {{V.charCount}} / {{@maxLength}}\n          </span>\n        {{/if}}\n      </V.Label>\n    </TpkValidationTextareaComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationTextareaComponent,
    MandatoryLabelComponent,
    TpkValidationErrorsComponent
  })
}), templateOnly());

export { TpkValidationTextareaPrefabComponent as default };
//# sourceMappingURL=tpk-validation-textarea.js.map
