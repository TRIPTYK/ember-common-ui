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
  submitButtonText?: string;
}

export interface TpkLoginSignature {
  Args: TpkLoginArgs;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class LoginForm extends Component<TpkLoginSignature> {
  changeset = new ImmerChangeset(
    this.args.initialValues ?? {
      email: '',
      password: '',
    },
  );

  get submitButtonText() {
    return this.args.submitButtonText ?? 'Sign in';
  }

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @onSubmit={{@onSubmit}}
      @reactive={{true}}
      @validationSchema={{@loginSchema}}
      class='tpk-login-form'
      data-test-tpk-login-form
      ...attributes
      as |F|
    >
      <F.TpkEmailPrefab
        @label='Email'
        @validationField='email'
        class='tpk-login-form-email'
        data-test-tpk-login-form-email
      />
      <F.TpkPasswordPrefab
        @label='Password'
        @validationField='password'
        class='tpk-login-form-password'
        data-test-tpk-login-form-password
      />
      <button class='tpk-login-form-button' type='submit'>
        {{this.submitButtonText}}
      </button>
    </TpkForm>
  </template>
}
