import Component from '@glimmer/component';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkResetPasswordComponent extends Component {
  changeset = new ImmerChangeset(this.args.initialValues ?? {
    password: '',
    confirmPassword: ''
  });
  get submitButtonText() {
    return this.args.submitButtonText ?? 'Reset Password';
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkForm @changeset={{this.changeset}} @onSubmit={{@onSubmit}} @reactive={{true}} @validationSchema={{@resetPasswordSchema}} class=\"tpk-reset-password-form\" data-test-tpk-reset-password-form as |F|>\n  <F.TpkPasswordPrefab @label=\"New Password\" @validationField=\"password\" class=\"tpk-reset-password-form-password\" data-test-tpk-reset-password-form-password />\n\n  <F.TpkPasswordPrefab @label=\"Confirm Password\" @validationField=\"confirmPassword\" class=\"tpk-reset-password-form-confirm-password\" data-test-tpk-reset-password-form-confirm-password />\n\n  <button class=\"tpk-reset-password-form-button\" type=\"submit\">\n    {{this.submitButtonText}}\n  </button>\n</TpkForm>", {
      strictMode: true,
      scope: () => ({
        TpkForm
      })
    }), this);
  }
}

export { TpkResetPasswordComponent as default };
//# sourceMappingURL=tpk-reset-password.js.map
