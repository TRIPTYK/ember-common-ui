import TpkValidationInputComponent from '../tpk-validation-input.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import { maskSpecialCharDefinition, getMaskForPrefixOrDefault } from '../../utils/mask-utils.js';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationIBANPrefabComponent extends Component {
  ibanMaskByCountry = [{
    mask: '$$&& &&&& &&&& &&&&',
    startsWith: 'BE',
    definitions: maskSpecialCharDefinition,
    lazy: false
  }, {
    mask: '$$&& &&&& &&&& &&$$ $$$$ $$$$ $&&',
    startsWith: 'FR',
    lazy: false,
    definitions: maskSpecialCharDefinition
  }, {
    mask: '$$&& &&&$ $$$$ $$$$ $$$$',
    startsWith: 'LU',
    definitions: maskSpecialCharDefinition,
    lazy: false
  }, {
    mask: '$$&& #### &&&& &&&& &&',
    startsWith: 'NL',
    definitions: maskSpecialCharDefinition,
    lazy: false
  }, {
    mask: '$$&& &&&& &&&& &&&& &&&& &&',
    definitions: maskSpecialCharDefinition,
    startsWith: 'DE',
    lazy: false
  }, {
    mask: '##',
    startsWith: '',
    default: true,
    definitions: maskSpecialCharDefinition,
    lazy: false
  }];
  maskOptions = {
    dispatch: getMaskForPrefixOrDefault
  };
  get hasMaskNotDisabled() {
    return this.args.disabled ? '' : this.ibanMaskByCountry;
  }
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
    setComponentTemplate(precompileTemplate("<TpkValidationInputComponent @label={{@label}} @type=\"text\" @onChange={{this.onChange}} @validationField={{@validationField}} @changeEvent={{@changeEvent}} @changeset={{@changeset}} @mandatory={{@mandatory}} @disabled={{@disabled}} @mask={{this.hasMaskNotDisabled}} @maskOptions={{this.maskOptions}} @requiredFields={{@requiredFields}} as |V|>\n  <V.Label class=\"tpk-iban-container\" data-test-tpk-prefab-iban-container={{@validationField}} data-has-error=\"{{V.hasError}}\" {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} ...attributes>\n    <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n    <V.Input class=\"tpk-iban-input uppercase\" data-test-tpk-iban-input />\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </V.Label>\n</TpkValidationInputComponent>", {
      strictMode: true,
      scope: () => ({
        TpkValidationInputComponent,
        MandatoryLabelComponent,
        TpkValidationErrorsComponent
      })
    }), this);
  }
}

export { TpkValidationIBANPrefabComponent as default };
//# sourceMappingURL=tpk-validation-iban.js.map
