import Component from '@glimmer/component';
import { service } from '@ember/service';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import t from 'ember-intl/helpers/t';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class LoginForm extends Component {
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
  changeset = new ImmerChangeset(this.args.initialValues ?? {
    email: '',
    password: ''
  });
  get submitButtonText() {
    return this.args.submitButtonText ?? this.intl.t('global.sign_in');
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkForm @changeset={{this.changeset}} @onSubmit={{@onSubmit}} @reactive={{true}} @validationSchema={{@loginSchema}} class=\"tpk-login-form\" data-test-tpk-login-form ...attributes as |F|>\n  <F.TpkEmailPrefab @label={{t \"global.email\"}} @validationField=\"email\" class=\"tpk-login-form-email\" data-test-tpk-login-form-email />\n  <F.TpkPasswordPrefab @label={{t \"global.password\"}} @validationField=\"password\" class=\"tpk-login-form-password\" data-test-tpk-login-form-password />\n  <button class=\"tpk-login-form-button\" type=\"submit\">\n    {{this.submitButtonText}}\n  </button>\n</TpkForm>", {
      strictMode: true,
      scope: () => ({
        TpkForm,
        t
      })
    }), this);
  }
}

export { LoginForm as default };
//# sourceMappingURL=tpk-login.js.map
