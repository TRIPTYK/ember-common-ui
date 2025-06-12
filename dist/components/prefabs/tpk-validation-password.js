import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import TpkValidationInputComponent from '../tpk-validation-input.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TpkValidationPasswordPrefabComponent;
let TpkValidationPasswordPrefabComponent = (_class = (_TpkValidationPasswordPrefabComponent = class TpkValidationPasswordPrefabComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "showPassword", _descriptor, this);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  get type() {
    return this.showPassword ? 'text' : 'password';
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkValidationInputComponent @label={{@label}} @type={{this.type}} @onChange={{@onChange}} @placeholder={{@placeholder}} @mandatory={{@mandatory}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @changeset={{@changeset}} @validationField={{@validationField}} @requiredFields={{@requiredFields}} as |V|>\n      <V.Label class=\"tpk-password-container\" data-test-tpk-prefab-password-container data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} ...attributes>\n        <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n        <div class=\"tpk-password-input-container\">\n          <V.Input class=\"tpk-password-input\" data-test-tpk-password-input />\n          {{#unless @disabled}}\n            <button type=\"button\" class=\"tpk-password-toggle-button\" title={{if this.showPassword \"show\" \"hide\"}} {{on \"click\" this.togglePassword}} data-test-tpk-password-toggle-button>\n              <img src={{if this.showPassword \"/assets/icons/eye-shut.svg\" \"/assets/icons/eye.svg\"}} data-test-tpk-password-toggle-icon alt=\"eye\" class=\"tpk-password-toggle-icon\" />\n            </button>\n          {{/unless}}\n        </div>\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n      </V.Label>\n    </TpkValidationInputComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationInputComponent,
    MandatoryLabelComponent,
    on,
    TpkValidationErrorsComponent
  })
}), _TpkValidationPasswordPrefabComponent), _TpkValidationPasswordPrefabComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "showPassword", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "togglePassword", [action], Object.getOwnPropertyDescriptor(_class.prototype, "togglePassword"), _class.prototype), _class);

export { TpkValidationPasswordPrefabComponent as default };
//# sourceMappingURL=tpk-validation-password.js.map
