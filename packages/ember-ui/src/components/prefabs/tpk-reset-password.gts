import Component from '@glimmer/component';
import { service } from '@ember/service';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import t from 'ember-intl/helpers/t';
import type IntlService from 'ember-intl/services/intl';
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

export default class TpkResetPassword extends Component<TpkResetPasswordSignature> {
  @service declare intl: IntlService;

  changeset = new ImmerChangeset(
    this.args.initialValues ?? {
      password: '',
      confirmPassword: '',
    },
  );

  get submitButtonText() {
    return this.args.submitButtonText ?? this.intl.t('global.reset_password');
  }

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @onSubmit={{@onSubmit}}
      @reactive={{true}}
      @validationSchema={{@resetPasswordSchema}}
      class='tpk-reset-password-form'
      data-test-tpk-reset-password-form
      as |F|
    >
      <F.TpkPasswordPrefab
        @label={{t 'global.new_password'}}
        @validationField='password'
        class='tpk-reset-password-form-password'
        data-test-tpk-reset-password-form-password
      />

      <F.TpkPasswordPrefab
        @label={{t 'global.confirm_password'}}
        @validationField='confirmPassword'
        class='tpk-reset-password-form-confirm-password'
        data-test-tpk-reset-password-form-confirm-password
      />

      <button class='tpk-reset-password-form-button' type='submit'>
        {{this.submitButtonText}}
      </button>
    </TpkForm>
  </template>
}
