import TpkValidationInputComponent from '../tpk-validation-input.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import { maskSpecialCharDefinition } from '../../utils/mask-utils.js';
import MandatoryLabelComponent from './mandatory-label.js';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationBicPrefabComponent extends Component {
  mask = '########[$$$]';
  maskOptions = {
    definitions: maskSpecialCharDefinition
  };
  onChange(value, e) {
    const valueAsString = value.toUpperCase();
    if (this.args.onChange) {
      return this.args.onChange(valueAsString, e);
    }
    return this.args.changeset.set(this.args.validationField, valueAsString);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkValidationInputComponent @label={{@label}} @disabled={{@disabled}} @type=\"text\" @onChange={{this.onChange}} @mandatory={{@mandatory}} @placeholder={{@placeholder}} @validationField={{@validationField}} @changeEvent={{@changeEvent}} @changeset={{@changeset}} @mask={{this.mask}} @maskOptions={{this.maskOptions}} @requiredFields={{@requiredFields}} as |V|>\n  <V.Label class=\"tpk-bic-container\" data-test-tpk-prefab-bic-container={{@validationField}} data-has-error=\"{{V.hasError}}\" {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} ...attributes>\n    <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n    <V.Input class=\"tpk-bic-input uppercase\" data-test-tpk-bic-input />\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </V.Label>\n</TpkValidationInputComponent>", {
      strictMode: true,
      scope: () => ({
        TpkValidationInputComponent,
        MandatoryLabelComponent,
        TpkValidationErrorsComponent
      })
    }), this);
  }
}

export { TpkValidationBicPrefabComponent as default };
//# sourceMappingURL=tpk-validation-bic.js.map
