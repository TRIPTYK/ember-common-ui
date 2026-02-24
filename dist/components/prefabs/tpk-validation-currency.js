import TpkValidationInputComponent from '../tpk-validation-input.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkValidationCurrencyPrefabComponent extends Component {
  get mask() {
    return {
      mask: 'num €',
      lazy: false,
      blocks: {
        num: {
          expose: true,
          mask: Number,
          scale: this.args.scale ?? 2,
          thousandsSeparator: ' ',
          padFractionalZeros: true,
          radix: '.',
          mapToRadix: ['.', ',']
        }
      }
    };
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkValidationInputComponent @label={{@label}} @type=\"text\" @onChange={{@onChange}} @placeholder={{@placeholder}} @mask={{this.mask}} @maskOptions={{this.mask}} @disabled={{@disabled}} @unmaskValue={{true}} @mandatory={{@mandatory}} @changeEvent={{@changeEvent}} @changeset={{@changeset}} @validationField={{@validationField}} @requiredFields={{@requiredFields}} as |V|>\n  <V.Label class=\"tpk-currency-container\" data-test-tpk-prefab-currency-container={{@validationField}} data-has-error=\"{{V.hasError}}\" {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} ...attributes>\n    <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n    <V.Input placeholder={{@placeholder}} data-test-tpk-currency-input class=\"tpk-currency-input\" />\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </V.Label>\n</TpkValidationInputComponent>", {
      strictMode: true,
      scope: () => ({
        TpkValidationInputComponent,
        MandatoryLabelComponent,
        TpkValidationErrorsComponent
      })
    }), this);
  }
}

export { TpkValidationCurrencyPrefabComponent as default };
//# sourceMappingURL=tpk-validation-currency.js.map
