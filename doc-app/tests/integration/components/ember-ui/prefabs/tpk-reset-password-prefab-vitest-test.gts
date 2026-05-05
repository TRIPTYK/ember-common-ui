import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkResetPassword from '@triptyk/ember-ui/components/prefabs/tpk-reset-password';
import resetPasswordPageObject from 'doc-app/tests/pages/tpk-reset-password';
import { setupTest } from '../../../../test-helper';

describe('Integration | Component | Prefabs | Tpk-reset-password-prefab', () => {
  const resetPasswordSchema = object({
    password: string().min(8),
    confirmPassword: string().min(8),
  });

  async function renderComponent(params?: {
    onSubmit?: (data: unknown, changeset: ImmerChangeset) => void;
    initialValues?: { password: string; confirmPassword: string };
    submitButtonText?: string;
  }) {
    const onSubmit = params?.onSubmit ?? (() => {});
    const initialValues = params?.initialValues;
    const submitButtonText = params?.submitButtonText;

    await render(
      <template>
        <TpkResetPassword
          @onSubmit={{onSubmit}}
          @resetPasswordSchema={{resetPasswordSchema}}
          @initialValues={{initialValues}}
          @submitButtonText={{submitButtonText}}
        />
      </template>,
    );
  }

  renderingTest(
    'renders reset password form with password and confirmPassword fields',
    async ({ env }) => {
      setupTest(env.owner);
      await renderComponent();
      expect(
        document.querySelector(resetPasswordPageObject.scope),
      ).toBeTruthy();
      expect(
        document.querySelector('[data-test-tpk-reset-password-form-password]'),
      ).toBeTruthy();
      expect(
        document.querySelector(
          '[data-test-tpk-reset-password-form-confirm-password]',
        ),
      ).toBeTruthy();
      expect(
        document.querySelector(resetPasswordPageObject.submitButton.scope),
      ).toBeTruthy();
    },
  );

  renderingTest('displays default submit button text', async ({ env }) => {
    setupTest(env.owner);
    await renderComponent();
    expect(resetPasswordPageObject.submitButton.text).toBe('Reset Password');
  });

  renderingTest('displays custom submit button text', async ({ env }) => {
    setupTest(env.owner);
    await renderComponent({ submitButtonText: 'Réinitialiser' });
    expect(resetPasswordPageObject.submitButton.text).toBe('Réinitialiser');
  });

  renderingTest('uses initial values when provided', async ({ env }) => {
    setupTest(env.owner);
    setupTest(env.owner);
    await renderComponent({
      initialValues: {
        password: 'initialPassword',
        confirmPassword: 'initialConfirmPassword',
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 5000));
    expect(resetPasswordPageObject.password.value).toBe('initialPassword');
    expect(resetPasswordPageObject.confirmPassword.value).toBe(
      'initialConfirmPassword',
    );
  });

  renderingTest(
    'onSubmit is called with data and changeset when form is valid',
    async ({ env }) => {
      setupTest(env.owner);
      setupTest(env.owner);
      let receivedData: unknown;
      let receivedChangeset: ImmerChangeset | undefined;

      await renderComponent({
        onSubmit: (data, changeset) => {
          receivedData = data;
          receivedChangeset = changeset;
        },
      });

      await resetPasswordPageObject.password.fillIn('password123');
      await resetPasswordPageObject.confirmPassword.fillIn('password123');
      await resetPasswordPageObject.submitButton.click();

      expect(receivedData).toEqual({
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(receivedChangeset instanceof ImmerChangeset).toBeTruthy();
      expect(receivedChangeset?.get('password')).toBe('password123');
      expect(receivedChangeset?.get('confirmPassword')).toBe('password123');
    },
  );

  renderingTest(
    'onSubmit is not called when form is invalid',
    async ({ env }) => {
      setupTest(env.owner);
      setupTest(env.owner);
      const onSubmit = vi.fn();

      await renderComponent({ onSubmit });

      await resetPasswordPageObject.password.fillIn('short');
      await resetPasswordPageObject.confirmPassword.fillIn('short');
      await resetPasswordPageObject.submitButton.click();

      expect(onSubmit).not.toHaveBeenCalled();
    },
  );

  renderingTest(
    'onSubmit is not called when password is empty',
    async ({ env }) => {
      setupTest(env.owner);
      setupTest(env.owner);
      const onSubmit = vi.fn();

      await renderComponent({ onSubmit });

      await resetPasswordPageObject.password.fillIn('');
      await resetPasswordPageObject.confirmPassword.fillIn('password123');
      await resetPasswordPageObject.submitButton.click();

      expect(onSubmit).not.toHaveBeenCalled();
    },
  );
});
