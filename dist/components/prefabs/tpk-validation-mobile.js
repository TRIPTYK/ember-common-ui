import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseValidationComponent } from '../base.js';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkInput from '@triptyk/ember-input/components/tpk-input';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

const masks = {
  '+31': '00 0000 0000',
  '+32': '000 00 00 00',
  '+33': '0 00 00 00 00',
  '+49': '0000 0000000',
  '+352': '000 000 000'
};
class TpkValidationMobilePrefabComponent extends BaseValidationComponent {
  defaultPrefix = {
    flag: '/BE.svg',
    code: '+32'
  };
  static {
    g(this.prototype, "selectedPrefix", [tracked], function () {
      return this.defaultPrefix;
    });
  }
  #selectedPrefix = (i(this, "selectedPrefix"), void 0);
  prefixes = [{
    flag: '/NL.svg',
    code: '+31'
  }, {
    flag: '/BE.svg',
    code: '+32'
  }, {
    flag: '/FR.svg',
    code: '+33'
  }, {
    flag: '/DE.svg',
    code: '+49'
  }, {
    flag: '/LU.svg',
    code: '+352'
  }];
  constructor(owner, args) {
    super(owner, args);
    this.selectedPrefix = this.getPrefix();
  }
  get valueForMobileNumber() {
    return this.getValue();
  }
  get mask() {
    return masks[this.selectedPrefix.code] || '000 00 00 00';
  }
  getPrefix() {
    const value = this.value;
    if (typeof value === 'string') {
      const matchedPrefix = this.prefixes.find(prefix => value.startsWith(prefix.code)) || this.defaultPrefix;
      return matchedPrefix;
    }
    return this.defaultPrefix;
  }
  getValue() {
    const fullValue = this.value;
    if (typeof fullValue === 'string') {
      const matchedPrefix = this.prefixes.find(prefix => fullValue.startsWith(prefix.code));
      if (matchedPrefix) {
        return fullValue.slice(matchedPrefix.code.length).trim();
      }
    }
    return fullValue || '';
  }
  onChangeValueMobile(value) {
    if (!value) {
      this.args.changeset.set(this.args.validationField, value);
    } else {
      this.args.changeset.set(this.args.validationField,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${this.selectedPrefix.code}${value}`);
    }
  }
  static {
    n(this.prototype, "onChangeValueMobile", [action]);
  }
  onChangeValuePrefix(value) {
    if (!value) return;
    const code = value.code;
    this.selectedPrefix = this.prefixes.find(prefix => prefix.code === code) || this.defaultPrefix;
  }
  static {
    n(this.prototype, "onChangeValuePrefix", [action]);
  }
  getValueFromOption = (option, key) => option[key];
  static {
    setComponentTemplate(precompileTemplate("<TpkInputComponent @value={{this.valueForMobileNumber}} @label={{@label}} @onChange={{this.onChangeValueMobile}} @disabled={{@disabled}} @mask={{this.mask}} @unmaskValue={{true}} as |I|>\n  <div class=\"tpk-mobile-container\" data-has-error=\"{{this.hasError}}\" data-test-tpk-prefab-mobile-container={{@validationField}} {{!-- @glint-expect-error --}} anchorScrollUp={{@validationField}} ...attributes>\n    <I.Label data-test-tpk-input data-has-error=\"{{this.hasError}}\" class=\"tpk-mobile-label-container\">\n      <MandatoryLabelComponent @label={{@label}} @mandatory={{this.mandatory}} class=\"tpk-label\" />\n    </I.Label>\n    <div class=\"tpk-mobile-content\">\n      <TpkSelectComponent @label=\"\" @options={{this.prefixes}} @selected={{this.selectedPrefix}} @disabled={{@disabled}} @onChange={{this.onChangeValuePrefix}} as |T|>\n        <T.Option as |O|>\n          <div class=\"flag\">\n            <img alt={{this.getValueFromOption O.option \"code\"}} src={{this.getValueFromOption O.option \"flag\"}} width=\"20\" />\n            <div>\n              {{this.getValueFromOption O.option \"code\"}}\n            </div>\n          </div>\n        </T.Option>\n      </TpkSelectComponent>\n      <I.Input data-test-tpk-mobile-input inputmode=\"tel\" class=\"tpk-mobile-input\" />\n    </div>\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{this.errors}} />\n  </div>\n</TpkInputComponent>", {
      strictMode: true,
      scope: () => ({
        TpkInputComponent: TpkInput,
        MandatoryLabelComponent,
        TpkSelectComponent,
        TpkValidationErrorsComponent
      })
    }), this);
  }
}

export { TpkValidationMobilePrefabComponent as default };
//# sourceMappingURL=tpk-validation-mobile.js.map
