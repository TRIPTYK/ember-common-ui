import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import TpkLoginForm from '@triptyk/ember-ui/components/prefabs/tpk-login';
import AuthLayout from 'doc-app/components/auth-layout.gts';
import { email, object, string } from 'zod';

export default class LoginTemplate extends Component {
  loginValidationSchema = object({
    email: email(),
    password: string().min(8, 'Should be at least 8 characters'),
  });

  onSubmit = async () => {};
  <template>
    <AuthLayout>
      <h1>Sign in</h1>
      <TpkLoginForm
        @onSubmit={{this.onSubmit}}
        @loginSchema={{this.loginValidationSchema}}
        class="tpk-login-form"
      />
      <LinkTo @route="forgot-password" class="forgot-password-link">Forgot
        password?</LinkTo>
    </AuthLayout>
  </template>
}
