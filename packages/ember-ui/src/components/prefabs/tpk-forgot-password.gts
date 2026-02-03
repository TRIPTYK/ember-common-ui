import Component from '@glimmer/component';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import type { ZodEmail, ZodObject } from 'zod';
import type z from 'zod';

type ForgotPasswordSchema = ZodObject<{
  email: ZodEmail;
}>;

export interface TpkForgotPasswordArgs {
  onSubmit: (
    data: z.infer<ForgotPasswordSchema>,
    changeset: ImmerChangeset<z.infer<ForgotPasswordSchema>>,
  ) => void;
  forgotPasswordSchema: ForgotPasswordSchema;
  initialValues?: z.infer<ForgotPasswordSchema>;
  submitButtonText?: string;
}

export interface TpkForgotPasswordSignature {
  Args: TpkForgotPasswordArgs;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkForgotPasswordComponent extends Component<TpkForgotPasswordSignature> {
  changeset = new ImmerChangeset(
    this.args.initialValues ?? {
      email: '',
    },
  );

  get submitButtonText() {
    return this.args.submitButtonText ?? 'Send Reset Link';
  }

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @onSubmit={{@onSubmit}}
      @reactive={{true}}
      @validationSchema={{@forgotPasswordSchema}}
      class="tpk-forgot-password-form"
      as |F|
    >
      <F.TpkEmailPrefab @label='Email Address' @validationField='email' class="tpk-forgot-password-form-email" />
      <button class="tpk-forgot-password-form-button" type='submit'>
        {{this.submitButtonText}}
      </button>
    </TpkForm>
  </template>
}
