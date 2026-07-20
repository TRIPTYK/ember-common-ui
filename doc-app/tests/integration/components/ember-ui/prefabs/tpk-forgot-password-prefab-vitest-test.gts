import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, email } from 'zod';
import TpkForgotPassword from '@triptyk/ember-ui/components/prefabs/tpk-forgot-password';
import forgotPasswordPageObject from 'doc-app/tests/pages/tpk-forgot-password';
import { setupTest } from '../../../../test-helper';

describe('Integration | Component | Prefabs | Tpk-forgot-password-prefab', () => {
  const forgotPasswordSchema = object({
    email: email(),
  });

  async function renderComponent(params?: {
    onSubmit?: (data: unknown, changeset: ImmerChangeset) => void;
    initialValues?: { email: string };
    submitButtonText?: string;
  }) {
    const onSubmit = params?.onSubmit ?? (() => {});
    const initialValues = params?.initialValues;
    const submitButtonText = params?.submitButtonText;

    await render(
      <template>
        <TpkForgotPassword
          @onSubmit={{onSubmit}}
          @forgotPasswordSchema={{forgotPasswordSchema}}
          @initialValues={{initialValues}}
          @submitButtonText={{submitButtonText}}
        />
      </template>,
    );
  }

  renderingTest(
    'renders forgot password form with email field',
    async ({ env }) => {
      setupTest(env.owner);
      await renderComponent();
      expect(forgotPasswordPageObject.scope).toBeTruthy();
      expect(
        document.querySelector('[data-test-tpk-forgot-password-form-email]'),
      ).toBeTruthy();
      expect(forgotPasswordPageObject.submitButton.scope).toBeTruthy();
    },
  );

  renderingTest('displays default submit button text', async ({ env }) => {
    setupTest(env.owner, 'en-us');
    await renderComponent();
    expect(forgotPasswordPageObject.submitButton.text).toBe('Send Reset Link');
  });

  renderingTest('displays custom submit button text', async ({ env }) => {
    setupTest(env.owner);
    await renderComponent({ submitButtonText: 'Envoyer le lien' });
    expect(forgotPasswordPageObject.submitButton.text).toBe('Envoyer le lien');
  });

  renderingTest('uses initial values when provided', async ({ env }) => {
    setupTest(env.owner);
    await renderComponent({
      initialValues: {
        email: 'test@example.com',
      },
    });
    expect(forgotPasswordPageObject.email.value).toBe('test@example.com');
  });

  renderingTest(
    'onSubmit is called with data and changeset when form is valid',
    async ({ env }) => {
      setupTest(env.owner);
      let receivedData: unknown;
      let receivedChangeset: ImmerChangeset | undefined;

      await renderComponent({
        onSubmit: (data, changeset) => {
          receivedData = data;
          receivedChangeset = changeset;
        },
      });

      await forgotPasswordPageObject.email.fillIn('test@example.com');
      await forgotPasswordPageObject.submitButton.click();

      expect(receivedData).toEqual({
        email: 'test@example.com',
      });
      expect(receivedChangeset instanceof ImmerChangeset).toBeTruthy();
      expect(receivedChangeset?.get('email')).toBe('test@example.com');
    },
  );

  renderingTest(
    'onSubmit is not called when form is invalid',
    async ({ env }) => {
      setupTest(env.owner);
      const onSubmit = vi.fn();

      await renderComponent({ onSubmit });

      await forgotPasswordPageObject.email.fillIn('invalid-email');
      await forgotPasswordPageObject.submitButton.click();

      expect(onSubmit).not.toHaveBeenCalled();
    },
  );
});
