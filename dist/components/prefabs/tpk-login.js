import Component from '@glimmer/component';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class LoginForm extends Component {
  changeset = new ImmerChangeset(this.args.initialValues ?? {
    email: '',
    password: ''
  });
  get submitButtonText() {
    return this.args.submitButtonText ?? 'Sign in';
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkForm @changeset={{this.changeset}} @onSubmit={{@onSubmit}} @reactive={{true}} @validationSchema={{@loginSchema}} class=\"tpk-login-form\" data-test-tpk-login-form ...attributes as |F|>\n  <F.TpkEmailPrefab @label=\"Email\" @validationField=\"email\" class=\"tpk-login-form-email\" data-test-tpk-login-form-email />\n  <F.TpkPasswordPrefab @label=\"Password\" @validationField=\"password\" class=\"tpk-login-form-password\" data-test-tpk-login-form-password />\n  <button class=\"tpk-login-form-button\" type=\"submit\">\n    {{this.submitButtonText}}\n  </button>\n</TpkForm>", {
      strictMode: true,
      scope: () => ({
        TpkForm
      })
    }), this);
  }
}

export { LoginForm as default };
//# sourceMappingURL=tpk-login.js.map
