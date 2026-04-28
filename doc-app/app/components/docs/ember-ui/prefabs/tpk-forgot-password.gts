import Component from '@glimmer/component';
import TpkForgotPassword from '@triptyk/ember-ui/components/prefabs/tpk-forgot-password';
import { email, object } from 'zod';
import { action } from '@ember/object';

export default class TpkForgotPasswordExample extends Component {
  forgotPasswordSchema = object({
    email: email('Invalid email'),
  });

  @action
  onSubmit(data: { email: string }) {
    alert(`Reset link sent to: ${data.email}`);
  }

  <template>
    <TpkForgotPassword
      @forgotPasswordSchema={{this.forgotPasswordSchema}}
      @onSubmit={{this.onSubmit}}
    />
  </template>
}
