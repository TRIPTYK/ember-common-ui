import Component from '@glimmer/component';
import { service } from '@ember/service';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import t from 'ember-intl/helpers/t';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class TpkForgotPassword extends Component {
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
  changeset = new ImmerChangeset(this.args.initialValues ?? {
    email: ''
  });
  get submitButtonText() {
    return this.args.submitButtonText ?? this.intl.t('global.send_reset_link');
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkForm @changeset={{this.changeset}} @onSubmit={{@onSubmit}} @reactive={{true}} @validationSchema={{@forgotPasswordSchema}} class=\"tpk-forgot-password-form\" data-test-tpk-forgot-password-form as |F|>\n  <F.TpkEmailPrefab @label={{t \"global.email_address\"}} @validationField=\"email\" class=\"tpk-forgot-password-form-email\" data-test-tpk-forgot-password-form-email />\n  <button class=\"tpk-forgot-password-form-button\" type=\"submit\">\n    {{this.submitButtonText}}\n  </button>\n</TpkForm>", {
      strictMode: true,
      scope: () => ({
        TpkForm,
        t
      })
    }), this);
  }
}

export { TpkForgotPassword as default };
//# sourceMappingURL=tpk-forgot-password.js.map
