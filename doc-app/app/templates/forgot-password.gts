import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import TpkForgotPasswordForm from '@triptyk/ember-ui/components/prefabs/tpk-forgot-password';
import { email, object } from 'zod';
import AuthLayout from 'doc-app/components/auth-layout.gts';

export default class ForgotPasswordTemplate extends Component {
  forgotPasswordValidationSchema = object({
    email: email(),
  })

  onSubmit = async () => {}
  <template>
    <AuthLayout>
      <h1>Forgot password</h1>
      <TpkForgotPasswordForm
        @onSubmit={{this.onSubmit}}
        @forgotPasswordSchema={{this.forgotPasswordValidationSchema}}
        class="tpk-login-form"
      />
      <LinkTo @route="login" class="login-link">Back to login</LinkTo>
    </AuthLayout>
  </template>
}
