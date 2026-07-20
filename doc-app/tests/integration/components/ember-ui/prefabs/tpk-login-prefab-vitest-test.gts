import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, email, string } from 'zod';
import TpkLogin from '@triptyk/ember-ui/components/prefabs/tpk-login';
import loginPageObject from 'doc-app/tests/pages/tpk-login';
import { setupTest } from '../../../../test-helper';

describe('Integration | Component | Prefabs | Tpk-login-prefab', () => {
  const loginSchema = object({
    email: email(),
    password: string().min(1),
  });

  async function renderComponent(params?: {
    onSubmit?: (data: unknown, changeset: ImmerChangeset) => void;
    initialValues?: { email: string; password: string };
    submitButtonText?: string;
  }) {
    const onSubmit = params?.onSubmit ?? (() => {});
    const initialValues = params?.initialValues;
    const submitButtonText = params?.submitButtonText;

    await render(
      <template>
        <TpkLogin
          @onSubmit={{onSubmit}}
          @loginSchema={{loginSchema}}
          @initialValues={{initialValues}}
          @submitButtonText={{submitButtonText}}
        />
      </template>,
    );
  }

  renderingTest(
    'renders login form with email and password fields',
    async ({ env }) => {
      setupTest(env.owner);
      await renderComponent();
      expect(document.querySelector(loginPageObject.scope)).toBeTruthy();
      expect(
        document.querySelector('[data-test-tpk-login-form-email]'),
      ).toBeTruthy();
      expect(
        document.querySelector('[data-test-tpk-login-form-password]'),
      ).toBeTruthy();
      expect(
        document.querySelector(loginPageObject.submitButton.scope),
      ).toBeTruthy();
    },
  );

  renderingTest('displays default submit button text', async ({ env }) => {
    setupTest(env.owner, 'en-us');
    await renderComponent();
    expect(loginPageObject.submitButton.text).toBe('Sign in');
  });

  renderingTest('displays custom submit button text', async ({ env }) => {
    setupTest(env.owner);
    await renderComponent({ submitButtonText: 'Connexion' });
    expect(loginPageObject.submitButton.text).toBe('Connexion');
  });

  renderingTest('uses initial values when provided', async ({ env }) => {
    setupTest(env.owner);
    await renderComponent({
      initialValues: {
        email: 'test@example.com',
        password: 'initialPassword',
      },
    });
    expect(loginPageObject.email.value).toBe('test@example.com');
    expect(loginPageObject.password.value).toBe('initialPassword');
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

      await loginPageObject.email.fillIn('test@example.com');
      await loginPageObject.password.fillIn('password123');
      await loginPageObject.submitButton.click();

      expect(receivedData).toEqual({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(receivedChangeset instanceof ImmerChangeset).toBeTruthy();
      expect(receivedChangeset?.get('email')).toBe('test@example.com');
      expect(receivedChangeset?.get('password')).toBe('password123');
    },
  );

  renderingTest(
    'onSubmit is not called when form is invalid',
    async ({ env }) => {
      setupTest(env.owner);
      const onSubmit = vi.fn();

      await renderComponent({ onSubmit });

      await loginPageObject.email.fillIn('invalid-email');
      await loginPageObject.password.fillIn('password123');
      await loginPageObject.submitButton.click();

      expect(onSubmit).not.toHaveBeenCalled();
    },
  );

  renderingTest(
    'onSubmit is not called when password is empty',
    async ({ env }) => {
      setupTest(env.owner);
      const onSubmit = vi.fn();

      await renderComponent({ onSubmit });

      await loginPageObject.email.fillIn('test@example.com');
      await loginPageObject.password.fillIn('');
      await loginPageObject.submitButton.click();

      expect(onSubmit).not.toHaveBeenCalled();
    },
  );
});
