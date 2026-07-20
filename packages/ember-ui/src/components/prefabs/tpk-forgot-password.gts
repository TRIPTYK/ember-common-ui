import Component from '@glimmer/component';
import { service } from '@ember/service';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import t from 'ember-intl/helpers/t';
import type IntlService from 'ember-intl/services/intl';
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

export default class TpkForgotPassword extends Component<TpkForgotPasswordSignature> {
  @service declare intl: IntlService;

  changeset = new ImmerChangeset(
    this.args.initialValues ?? {
      email: '',
    },
  );

  get submitButtonText() {
    return this.args.submitButtonText ?? this.intl.t('global.send_reset_link');
  }

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @onSubmit={{@onSubmit}}
      @reactive={{true}}
      @validationSchema={{@forgotPasswordSchema}}
      class='tpk-forgot-password-form'
      data-test-tpk-forgot-password-form
      as |F|
    >
      <F.TpkEmailPrefab
        @label={{t 'global.email_address'}}
        @validationField='email'
        class='tpk-forgot-password-form-email'
        data-test-tpk-forgot-password-form-email
      />
      <button class='tpk-forgot-password-form-button' type='submit'>
        {{this.submitButtonText}}
      </button>
    </TpkForm>
  </template>
}
