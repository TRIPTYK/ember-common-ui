import Component from '@glimmer/component';
import TpkResetPassword from '@triptyk/ember-ui/components/prefabs/tpk-reset-password';
import { object, string } from 'zod';
import { action } from '@ember/object';
import type { ImmerChangeset } from 'ember-immer-changeset';

export default class TpkResetPasswordExample extends Component {
  resetPasswordSchema = object({
    password: string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: string().min(8, 'Password must be at least 8 characters'),
  });

  @action
  onSubmit(
    data: { password: string; confirmPassword: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _changeset: ImmerChangeset<{ password: string; confirmPassword: string }>,
  ) {
    alert(`Password reset with: ${data.password}`);
  }

  <template>
    <TpkResetPassword
      @resetPasswordSchema={{this.resetPasswordSchema}}
      @onSubmit={{this.onSubmit}}
    />
  </template>
}
