import Component from '@glimmer/component';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import type { ZodObject, ZodString } from 'zod';
import type z from 'zod';

type LoginSchema = ZodObject<{
  email: ZodString;
  password: ZodString;
}>;

export interface TpkLoginArgs {
  onSubmit: (data: z.infer<LoginSchema>, changeset: ImmerChangeset<z.infer<LoginSchema>>) => void;
  loginSchema: LoginSchema;
  initialValues?: z.infer<LoginSchema>;
}

export default class LoginForm extends Component<TpkLoginArgs> {
  changeset = new ImmerChangeset(this.args.initialValues ?? {
    email: '',
    password: '',
  });

  <template>
    <div class="login-form-container" data-test-login-form>
      <h2>Login</h2>
      <TpkForm
        @changeset={{this.changeset}}
        @onSubmit={{@onSubmit}}
        @reactive={{true}}
        @validationSchema={{@loginSchema}}
      as |F|>
        <F.TpkEmailPrefab @label="Email" @validationField="email" />
        <F.TpkPasswordPrefab @label="Password" @validationField="password" />
        <button type="submit">Login</button>
      </TpkForm>
    </div>
  </template>
}

