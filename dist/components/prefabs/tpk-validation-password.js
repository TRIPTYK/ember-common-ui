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
import { g, i, n } from 'decorator-transforms/runtime-esm';

var img$1 = "data:image/svg+xml,%3csvg width='21' height='17' viewBox='0 0 21 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.8868 0.853553C19.082 0.658291 19.082 0.341709 18.8868 0.146447C18.6915 -0.0488155 18.3749 -0.0488155 18.1797 0.146447L14.7524 3.57369C12.6784 2.63382 10.6618 2.50803 8.80404 2.90093C5.38357 3.62431 2.62052 6.08189 1.11887 8.10103L0.90686 8.3861L1.10629 8.6801C2.3415 10.5011 3.86746 11.8728 5.53512 12.791L2.20443 16.1217C2.00917 16.317 2.00917 16.6335 2.20443 16.8288C2.39969 17.0241 2.71627 17.0241 2.91154 16.8288L18.8868 0.853553ZM6.27428 12.0518L7.61289 10.7132C7.14082 10.0771 6.86157 9.28924 6.86157 8.4362C6.86157 6.32375 8.57405 4.61127 10.6865 4.61127C11.5395 4.61127 12.3274 4.89052 12.9635 5.36259L13.9913 4.33479C12.221 3.61607 10.537 3.55656 9.01095 3.87929C6.06216 4.50292 3.59091 6.57706 2.13944 8.41339C3.3144 10.0508 4.73881 11.2607 6.27428 12.0518ZM12.2459 6.08027L8.33057 9.99555C8.0342 9.54867 7.86157 9.01259 7.86157 8.4362C7.86157 6.87603 9.12634 5.61127 10.6865 5.61127C11.2629 5.61127 11.799 5.78389 12.2459 6.08027ZM16.0342 5.52281L16.7479 4.80328C17.8995 5.62443 19.0586 6.71904 20.2084 8.1358L20.4313 8.41047L20.2465 8.71208C18.0089 12.3642 14.4653 14.2255 10.84 14.232C9.82741 14.2338 8.81199 14.091 7.82019 13.8043L8.37858 13.2413C8.39568 13.2163 8.4153 13.1925 8.43744 13.1703L13.4567 8.13289L13.4554 8.12276L14.286 7.28537L14.2898 7.29683L16.0479 5.53234L16.0342 5.52281ZM13.0915 9.91623L12.0912 10.9201C12.5037 10.6758 12.8487 10.3296 13.0915 9.91623ZM9.83769 13.1818L10.7041 12.3123C12.7813 12.2855 14.4592 10.603 14.4786 8.52408L16.8537 6.14042C17.6304 6.77312 18.4156 7.54927 19.204 8.48964C17.1376 11.6536 14.0076 13.2263 10.8382 13.232C10.5052 13.2326 10.1713 13.2159 9.83769 13.1818Z' fill='%23605E67'/%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3csvg width='21' height='13' viewBox='0 0 21 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1.50269 6.45085C4.41816 2.53068 12.1761 -2.98715 19.8353 6.45085C15.5363 13.4676 6.29588 13.517 1.50269 6.45085Z' stroke='%23605E67'/%3e%3ccircle cx='10.669' cy='6.48761' r='3.32493' stroke='%23605E67'/%3e%3c/svg%3e";

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
    setComponentTemplate(precompileTemplate("<TpkValidationInputComponent @label={{@label}} @type={{this.type}} @onChange={{@onChange}} @placeholder={{@placeholder}} @mandatory={{@mandatory}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @changeset={{@changeset}} @validationField={{@validationField}} @requiredFields={{@requiredFields}} as |V|>\n  <V.Label class=\"tpk-password-container\" data-test-tpk-prefab-password-container={{@validationField}} data-has-error=\"{{V.hasError}}\" {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} ...attributes>\n    <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n    <div class=\"tpk-password-input-container\">\n      <V.Input class=\"tpk-password-input\" data-test-tpk-password-input />\n      {{#unless @disabled}}\n        <button type=\"button\" class=\"tpk-password-toggle-button\" title={{if this.showPassword \"show\" \"hide\"}} {{on \"click\" this.togglePassword}} data-test-tpk-password-toggle-button>\n          <img src={{if this.showPassword eyeOpen eyeShut}} data-test-tpk-password-toggle-icon alt=\"eye\" class=\"tpk-password-toggle-icon\" />\n        </button>\n      {{/unless}}\n    </div>\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </V.Label>\n</TpkValidationInputComponent>", {
      strictMode: true,
      scope: () => ({
        TpkValidationInputComponent,
        MandatoryLabelComponent,
        on,
        eyeOpen: img,
        eyeShut: img$1,
        TpkValidationErrorsComponent
      })
    }), this);
  }
}

export { TpkValidationPasswordPrefabComponent as default };
//# sourceMappingURL=tpk-validation-password.js.map
