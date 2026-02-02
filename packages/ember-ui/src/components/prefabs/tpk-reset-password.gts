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
  title?: string;
  description?: string;
  submitButtonText?: string;
}

export default class TpkResetPasswordComponent extends Component<TpkResetPasswordArgs> {
  changeset = new ImmerChangeset(
    this.args.initialValues ?? {
      password: '',
      confirmPassword: '',
    },
  );

  get title() {
    return this.args.title ?? 'Reset Password';
  }

  get description() {
    return this.args.description ?? 'Please enter your new password below.';
  }

  get submitButtonText() {
    return this.args.submitButtonText ?? 'Reset Password';
  }

  <template>
    <div class='flex min-h-screen items-center justify-center bg-base-200'>
      <div class='card w-96 bg-base-100 shadow-xl'>
        <div class='card-body'>
          <h2 class='card-title text-2xl font-bold'>{{this.title}}</h2>
          <p class='text-sm text-base-content/70'>{{this.description}}</p>

          <TpkForm
            @changeset={{this.changeset}}
            @onSubmit={{@onSubmit}}
            @reactive={{true}}
            @validationSchema={{@resetPasswordSchema}}
            as |F|
          >
            <div class='form-control'>
              <F.TpkPasswordPrefab
                @label='New Password'
                @validationField='password'
                @placeholder='Enter your new password'
              />
            </div>

            <div class='form-control'>
              <F.TpkPasswordPrefab
                @label='Confirm Password'
                @validationField='confirmPassword'
                @placeholder='Confirm your new password'
              />
            </div>

            <div class='card-actions mt-4'>
              <button type='submit' class='btn btn-primary w-full'>
                {{this.submitButtonText}}
              </button>
            </div>
          </TpkForm>
        </div>
      </div>
    </div>
  </template>
}
