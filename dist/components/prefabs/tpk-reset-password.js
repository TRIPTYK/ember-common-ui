import Component from '@glimmer/component';
import { service } from '@ember/service';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import t from 'ember-intl/helpers/t';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class TpkResetPassword extends Component {
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
  changeset = new ImmerChangeset(this.args.initialValues ?? {
    password: '',
    confirmPassword: ''
  });
  get submitButtonText() {
    return this.args.submitButtonText ?? this.intl.t('global.reset_password');
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkForm @changeset={{this.changeset}} @onSubmit={{@onSubmit}} @reactive={{true}} @validationSchema={{@resetPasswordSchema}} class=\"tpk-reset-password-form\" data-test-tpk-reset-password-form as |F|>\n  <F.TpkPasswordPrefab @label={{t \"global.new_password\"}} @validationField=\"password\" class=\"tpk-reset-password-form-password\" data-test-tpk-reset-password-form-password />\n\n  <F.TpkPasswordPrefab @label={{t \"global.confirm_password\"}} @validationField=\"confirmPassword\" class=\"tpk-reset-password-form-confirm-password\" data-test-tpk-reset-password-form-confirm-password />\n\n  <button class=\"tpk-reset-password-form-button\" type=\"submit\">\n    {{this.submitButtonText}}\n  </button>\n</TpkForm>", {
      strictMode: true,
      scope: () => ({
        TpkForm,
        t
      })
    }), this);
  }
}

export { TpkResetPassword as default };
//# sourceMappingURL=tpk-reset-password.js.map
