import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import TpkResetPasswordForm from '@triptyk/ember-ui/components/prefabs/tpk-reset-password';
import { object, string } from 'zod';
import AuthLayout from 'doc-app/components/auth-layout.gts';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import type Owner from '@ember/owner';
import { assert } from '@ember/debug';

export interface ResetPasswordTemplateSignature {
  Args: object;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class ResetPasswordTemplate extends Component<ResetPasswordTemplateSignature> {
  @service declare router: RouterService;
  declare token: string;

  constructor(owner: Owner, args: ResetPasswordTemplateSignature['Args']) {
    super(owner, args);
    assert('Token is required', this.router.currentRoute?.queryParams?.token);
    this.token = this.router.currentRoute?.queryParams?.token as string;
  }

  resetPasswordValidationSchema = object({
    password: string().min(8, 'Should be at least 8 characters'),
    confirmPassword: string().min(8, 'Should be at least 8 characters'),
  });

  onSubmit = async () => {};

  <template>
    <AuthLayout>
      <h1>Reset password</h1>
      <TpkResetPasswordForm
        @onSubmit={{this.onSubmit}}
        @resetPasswordSchema={{this.resetPasswordValidationSchema}}
        class="tpk-login-form"
      />
      <LinkTo @route="login" class="login-link">Back to login</LinkTo>
    </AuthLayout>
  </template>
}
