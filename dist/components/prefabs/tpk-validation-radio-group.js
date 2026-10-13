import TpkValidationRadioGroup from '../tpk-validation-radio-group.js';
import TpkValidationErrors from './tpk-validation-errors.js';
import TpkValidationRadioPrefab from './tpk-validation-radio.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkValidationRadioGroupPrefab = setComponentTemplate(precompileTemplate("<TpkValidationRadioGroup @validationField={{@validationField}} @changeset={{@changeset}} @onChange={{@onChange}} @mandatory={{@mandatory}} @requiredFields={{@requiredFields}} as |V|>\n  <fieldset class=\"tpk-radio-group-container\" data-has-error=\"{{V.hasError}}\" {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} data-test-tpk-prefab-radio-group-container={{@validationField}} ...attributes>\n    <legend class=\"tpk-radio-group-label\">\n      {{@groupLabel}}\n      {{#if @mandatory}}\n        <span class=\"mandatory\">*</span>\n      {{/if}}\n    </legend>\n    {{yield (component TpkValidationRadioPrefabComponent selected=V.selected validationField=@validationField changeset=@changeset disabled=@disabled mandatory=@mandatory)}}\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </fieldset>\n</TpkValidationRadioGroup>", {
  strictMode: true,
  scope: () => ({
    TpkValidationRadioGroup,
    TpkValidationRadioPrefabComponent: TpkValidationRadioPrefab,
    TpkValidationErrorsComponent: TpkValidationErrors
  })
}), templateOnly());

export { TpkValidationRadioGroupPrefab as default };
//# sourceMappingURL=tpk-validation-radio-group.js.map
