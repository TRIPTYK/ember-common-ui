import Component from '@glimmer/component';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import type { ZodEmail, ZodObject, ZodString } from 'zod';
import type z from 'zod';

type LoginSchema = ZodObject<{
  email: ZodEmail;
  password: ZodString;
}>;

export interface TpkLoginArgs {
  onSubmit: (
    data: z.infer<LoginSchema>,
    changeset: ImmerChangeset<z.infer<LoginSchema>>,
  ) => void;
  loginSchema: LoginSchema;
  initialValues?: z.infer<LoginSchema>;
}

export default class LoginForm extends Component<TpkLoginArgs> {
  changeset = new ImmerChangeset(
    this.args.initialValues ?? {
      email: '',
      password: '',
    },
  );

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @onSubmit={{@onSubmit}}
      @reactive={{true}}
      @validationSchema={{@loginSchema}}
      as |F|
    >
      <F.TpkEmailPrefab @label='Email' @validationField='email' />
      <F.TpkPasswordPrefab @label='Password' @validationField='password' />
      <button type='submit'>Login</button>
    </TpkForm>
  </template>
}
