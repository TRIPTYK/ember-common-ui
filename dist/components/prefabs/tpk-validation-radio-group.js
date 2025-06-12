import TpkValidationRadioGroupComponent from '../tpk-validation-radio-group.js';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import TpkValidationRadioPrefabComponent from './tpk-validation-radio.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkValidationRadioGroupPrefabComponent = setComponentTemplate(precompileTemplate("\n    <TpkValidationRadioGroupComponent @validationField={{@validationField}} @changeset={{@changeset}} @onChange={{@onChange}} @mandatory={{@mandatory}} @requiredFields={{@requiredFields}} as |V|>\n      <fieldset class=\"tpk-radio-group-container\" data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} data-test-tpk-prefab-radio-group-container ...attributes>\n        <legend class=\"tpk-radio-group-label\">\n          {{@groupLabel}}\n          {{#if @mandatory}}\n            <span class=\"mandatory\">*</span>\n          {{/if}}\n        </legend>\n        {{yield (component TpkValidationRadioPrefabComponent selected=V.selected validationField=@validationField changeset=@changeset disabled=@disabled mandatory=@mandatory)}}\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n      </fieldset>\n    </TpkValidationRadioGroupComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationRadioGroupComponent,
    TpkValidationRadioPrefabComponent,
    TpkValidationErrorsComponent
  })
}), templateOnly());

export { TpkValidationRadioGroupPrefabComponent as default };
//# sourceMappingURL=tpk-validation-radio-group.js.map
