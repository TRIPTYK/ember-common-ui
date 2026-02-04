import Component from '@glimmer/component';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkForgotPasswordComponent extends Component {
  changeset = new ImmerChangeset(this.args.initialValues ?? {
    email: ''
  });
  get submitButtonText() {
    return this.args.submitButtonText ?? 'Send Reset Link';
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkForm @changeset={{this.changeset}} @onSubmit={{@onSubmit}} @reactive={{true}} @validationSchema={{@forgotPasswordSchema}} class=\"tpk-forgot-password-form\" data-test-tpk-forgot-password-form as |F|>\n  <F.TpkEmailPrefab @label=\"Email Address\" @validationField=\"email\" class=\"tpk-forgot-password-form-email\" data-test-tpk-forgot-password-form-email />\n  <button class=\"tpk-forgot-password-form-button\" type=\"submit\">\n    {{this.submitButtonText}}\n  </button>\n</TpkForm>", {
      strictMode: true,
      scope: () => ({
        TpkForm
      })
    }), this);
  }
}

export { TpkForgotPasswordComponent as default };
//# sourceMappingURL=tpk-forgot-password.js.map
