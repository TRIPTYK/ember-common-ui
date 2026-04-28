import Component from '@glimmer/component';
import TpkLogin from '@triptyk/ember-ui/components/prefabs/tpk-login';
import { email, object, string } from 'zod';
import { action } from '@ember/object';
import type { ImmerChangeset } from 'ember-immer-changeset';

export default class TpkLoginExample extends Component {
  loginSchema = object({
    email: email('Invalid email'),
    password: string().min(8, 'Password must be at least 8 characters'),
  });

  @action
  onSubmit(
    data: { email: string; password: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _changeset: ImmerChangeset<{ email: string; password: string }>,
  ) {
    alert(`Login attempted with: ${data.email}`);
  }

  <template>
    <TpkLogin @loginSchema={{this.loginSchema}} @onSubmit={{this.onSubmit}} />
  </template>
}
