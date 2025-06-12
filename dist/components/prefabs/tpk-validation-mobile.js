import { _ as _applyDecoratedDescriptor, a as _defineProperty, b as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseValidationComponent } from '../base.js';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkInput from '@triptyk/ember-input/components/tpk-input';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _descriptor2, _TpkValidationMobilePrefabComponent;
const masks = {
  '+31': '00 0000 0000',
  '+32': '000 00 00 00',
  '+33': '0 00 00 00 00',
  '+49': '0000 0000000',
  '+352': '000 000 000'
};
let TpkValidationMobilePrefabComponent = (_class = (_TpkValidationMobilePrefabComponent = class TpkValidationMobilePrefabComponent extends BaseValidationComponent {
  constructor(owner, args) {
    super(owner, args);
    _defineProperty(this, "defaultPrefix", {
      flag: '/BE.svg',
      code: '+32'
    });
    _initializerDefineProperty(this, "selectedPrefix", _descriptor, this);
    _initializerDefineProperty(this, "prefixes", _descriptor2, this);
    _defineProperty(this, "getValueFromOption", (option, key) => option[key]);
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
      this.args.changeset.set(this.args.validationField, `${this.selectedPrefix.code}${value}`);
    }
  }
  onChangeValuePrefix(value) {
    if (!value) return;
    const code = value.code;
    this.selectedPrefix = this.prefixes.find(prefix => prefix.code === code) || this.defaultPrefix;
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkInputComponent @value={{this.valueForMobileNumber}} @label={{@label}} @onChange={{this.onChangeValueMobile}} @disabled={{@disabled}} @mask={{this.mask}} @unmaskValue={{true}} as |I|>\n      <div class=\"tpk-mobile-container\" data-has-error=\"{{this.hasError}}\" data-test-tpk-prefab-mobile-container anchorScrollUp={{@validationField}} ...attributes>\n        <I.Label data-test-tpk-input data-has-error=\"{{this.hasError}}\" class=\"tpk-mobile-label-container\">\n          <MandatoryLabelComponent @label={{@label}} @mandatory={{this.mandatory}} class=\"tpk-label\" />\n        </I.Label>\n        <div class=\"tpk-mobile-content\">\n          <TpkSelectComponent @label @options={{this.prefixes}} @selected={{this.selectedPrefix}} @disabled={{@disabled}} @onChange={{this.onChangeValuePrefix}} as |T|>\n            <T.Option as |O|>\n              <div class=\"flag\">\n                <img alt={{this.getValueFromOption O.option \"code\"}} src={{this.getValueFromOption O.option \"flag\"}} width=\"20\" />\n                <div>\n                  {{this.getValueFromOption O.option \"code\"}}\n                </div>\n              </div>\n            </T.Option>\n          </TpkSelectComponent>\n          <I.Input data-test-tpk-mobile-input inputmode=\"tel\" class=\"tpk-mobile-input\" />\n        </div>\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{this.errors}} />\n      </div>\n    </TpkInputComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkInputComponent: TpkInput,
    MandatoryLabelComponent,
    TpkSelectComponent,
    TpkValidationErrorsComponent
  })
}), _TpkValidationMobilePrefabComponent), _TpkValidationMobilePrefabComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "selectedPrefix", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.defaultPrefix;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "prefixes", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [{
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
  }
}), _applyDecoratedDescriptor(_class.prototype, "onChangeValueMobile", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChangeValueMobile"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onChangeValuePrefix", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChangeValuePrefix"), _class.prototype), _class);

export { TpkValidationMobilePrefabComponent as default };
//# sourceMappingURL=tpk-validation-mobile.js.map
