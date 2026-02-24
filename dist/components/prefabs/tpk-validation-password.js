import TpkValidationInputComponent from '../tpk-validation-input.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import EyeShutIcon from '../../assets/icons/eye-shut.js';
import EyeIcon from '../../assets/icons/eye.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class TpkValidationPasswordPrefabComponent extends Component {
  static {
    g(this.prototype, "showPassword", [tracked], function () {
      return false;
    });
  }
  #showPassword = (i(this, "showPassword"), void 0);
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  static {
    n(this.prototype, "togglePassword", [action]);
  }
  get type() {
    return this.showPassword ? 'text' : 'password';
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkValidationInputComponent @label={{@label}} @type={{this.type}} @onChange={{@onChange}} @placeholder={{@placeholder}} @mandatory={{@mandatory}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @changeset={{@changeset}} @validationField={{@validationField}} @requiredFields={{@requiredFields}} as |V|>\n  <V.Label class=\"tpk-password-container\" data-test-tpk-prefab-password-container={{@validationField}} data-has-error=\"{{V.hasError}}\" {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} ...attributes>\n    <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n    <div class=\"tpk-password-input-container\">\n      <V.Input class=\"tpk-password-input\" data-test-tpk-password-input />\n      {{#unless @disabled}}\n        <button type=\"button\" class=\"tpk-password-toggle-button\" title={{if this.showPassword \"show\" \"hide\"}} {{on \"click\" this.togglePassword}} data-test-tpk-password-toggle-button>\n          {{#if this.showPassword}}\n            <EyeIcon data-test-tpk-password-toggle-icon-eye class=\"tpk-password-toggle-icon\" />\n          {{else}}\n            <EyeShutIcon data-test-tpk-password-toggle-icon-eye-shut class=\"tpk-password-toggle-icon\" />\n          {{/if}}\n        </button>\n      {{/unless}}\n    </div>\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </V.Label>\n</TpkValidationInputComponent>", {
      strictMode: true,
      scope: () => ({
        TpkValidationInputComponent,
        MandatoryLabelComponent,
        on,
        EyeIcon,
        EyeShutIcon,
        TpkValidationErrorsComponent
      })
    }), this);
  }
}

export { TpkValidationPasswordPrefabComponent as default };
//# sourceMappingURL=tpk-validation-password.js.map
