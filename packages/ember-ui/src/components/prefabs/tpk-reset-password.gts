import Component from '@glimmer/component';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import type { ZodObject, ZodString } from 'zod';
import type z from 'zod';

type ResetPasswordSchema = ZodObject<{
  password: ZodString;
  confirmPassword: ZodString;
}>;

export interface TpkResetPasswordArgs {
  onSubmit: (
    data: z.infer<ResetPasswordSchema>,
    changeset: ImmerChangeset<z.infer<ResetPasswordSchema>>,
  ) => void;
  resetPasswordSchema: ResetPasswordSchema;
  initialValues?: z.infer<ResetPasswordSchema>;
  submitButtonText?: string;
}

export interface TpkResetPasswordSignature {
  Args: TpkResetPasswordArgs;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkResetPasswordComponent extends Component<TpkResetPasswordSignature> {
  changeset = new ImmerChangeset(
    this.args.initialValues ?? {
      password: '',
      confirmPassword: '',
    },
  );

  get submitButtonText() {
    return this.args.submitButtonText ?? 'Reset Password';
  }

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @onSubmit={{@onSubmit}}
      @reactive={{true}}
      @validationSchema={{@resetPasswordSchema}}
      class="tpk-reset-password-form"
      as |F|
    >
      <F.TpkPasswordPrefab @label='New Password' @validationField='password' class="tpk-reset-password-form-password" />

      <F.TpkPasswordPrefab @label='Confirm Password' @validationField='confirmPassword' class="tpk-reset-password-form-confirm-password" />

      <button class="tpk-reset-password-form-button" type='submit'>
        {{this.submitButtonText}}
      </button>
    </TpkForm>
  </template>
}
