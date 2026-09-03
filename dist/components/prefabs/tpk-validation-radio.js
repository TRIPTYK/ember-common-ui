import '@ember/debug';
import '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationRadio from '../tpk-validation-radio.js';
import TpkValidationErrors from './tpk-validation-errors.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkValidationRadioPrefab = setComponentTemplate(precompileTemplate("<TpkValidationRadio @value={{@value}} @selected={{@selected}} @label={{@label}} @validationField={{@validationField}} @changeset={{@changeset}} @classless={{@classless}} @changeEvent={{@changeEvent}} @disabled={{@disabled}} @onChange={{@onChange}} @requiredFields={{@requiredFields}} as |V|>\n  <div class=\"tpk-radio-container\" data-test-tpk-prefab-radio-container={{@validationField}} {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} ...attributes>\n    <V.Label class=\"tpk-radio-label\">\n      <span>{{@label}}</span>\n      <V.Input class=\"tpk-radio-input\" />\n    </V.Label>\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </div>\n</TpkValidationRadio>", {
  strictMode: true,
  scope: () => ({
    TpkValidationRadio,
    TpkValidationErrorsComponent: TpkValidationErrors
  })
}), templateOnly());

export { TpkValidationRadioPrefab as default };
//# sourceMappingURL=tpk-validation-radio.js.map
