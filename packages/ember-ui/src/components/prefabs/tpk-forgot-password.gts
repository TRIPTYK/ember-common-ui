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
  title?: string;
  description?: string;
  submitButtonText?: string;
}

export default class TpkForgotPasswordComponent extends Component<TpkForgotPasswordArgs> {
  changeset = new ImmerChangeset(
    this.args.initialValues ?? {
      email: '',
    },
  );

  get title() {
    return this.args.title ?? 'Forgot Password';
  }

  get description() {
    return (
      this.args.description ??
      'Enter your email address and we will send you a link to reset your password.'
    );
  }

  get submitButtonText() {
    return this.args.submitButtonText ?? 'Send Reset Link';
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
            @validationSchema={{@forgotPasswordSchema}}
            as |F|
          >
            <div class='form-control'>
              <F.TpkEmailPrefab
                @label='Email Address'
                @validationField='email'
                @placeholder='your.email@example.com'
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
