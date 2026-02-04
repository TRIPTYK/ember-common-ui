import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import { render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, email, string } from 'zod';
import TpkLogin from '@triptyk/ember-ui/components/prefabs/tpk-login';
import loginPageObject from 'doc-app/tests/pages/tpk-login';

module(
  'Integration | Component | Prefabs | Tpk-login-prefab',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

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
        </template>
      );
    }

    test('renders login form with email and password fields', async function (assert) {
      await renderComponent();
      assert.dom(loginPageObject.scope).exists();
      assert.dom('[data-test-tpk-login-form-email]').exists();
      assert.dom('[data-test-tpk-login-form-password]').exists();
      assert.dom(loginPageObject.submitButton.scope).exists();
    });

    test('displays default submit button text', async function (assert) {
      await renderComponent();
      assert.strictEqual(loginPageObject.submitButton.text, 'Sign in');
    });

    test('displays custom submit button text', async function (assert) {
      await renderComponent({ submitButtonText: 'Connexion' });
      assert.strictEqual(loginPageObject.submitButton.text, 'Connexion');
    });

    test('uses initial values when provided', async function (assert) {
      await renderComponent({
        initialValues: {
          email: 'test@example.com',
          password: 'initialPassword',
        },
      });
      assert.strictEqual(loginPageObject.email.value, 'test@example.com');
      assert.strictEqual(loginPageObject.password.value, 'initialPassword');
    });

    test('onSubmit is called with data and changeset when form is valid', async function (assert) {
      let receivedData: unknown;
      let receivedChangeset: ImmerChangeset | undefined;

      await renderComponent({
        onSubmit: (data, changeset) => {
          receivedData = data;
          receivedChangeset = changeset;
          assert.step('onSubmit');
        },
      });

      await loginPageObject.email.fillIn('test@example.com');
      await loginPageObject.password.fillIn('password123');
      await loginPageObject.submitButton.click();

      assert.verifySteps(['onSubmit']);
      assert.deepEqual(receivedData, {
        email: 'test@example.com',
        password: 'password123',
      });
      assert.ok(receivedChangeset instanceof ImmerChangeset);
      assert.strictEqual(receivedChangeset?.get('email'), 'test@example.com');
      assert.strictEqual(receivedChangeset?.get('password'), 'password123');
    });

    test('onSubmit is not called when form is invalid', async function (assert) {
      await renderComponent({
        onSubmit: () => {
          assert.step('onSubmit');
        },
      });

      await loginPageObject.email.fillIn('invalid-email');
      await loginPageObject.password.fillIn('password123');
      await loginPageObject.submitButton.click();

      assert.verifySteps([]);
    });

    test('onSubmit is not called when password is empty', async function (assert) {
      await renderComponent({
        onSubmit: () => {
          assert.step('onSubmit');
        },
      });

      await loginPageObject.email.fillIn('test@example.com');
      await loginPageObject.password.fillIn('');
      await loginPageObject.submitButton.click();

      assert.verifySteps([]);
    });
  }
);
