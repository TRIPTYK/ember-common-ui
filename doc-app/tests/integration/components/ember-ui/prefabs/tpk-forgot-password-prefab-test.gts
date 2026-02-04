import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import { render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, email } from 'zod';
import TpkForgotPassword from '@triptyk/ember-ui/components/prefabs/tpk-forgot-password';
import forgotPasswordPageObject from 'doc-app/tests/pages/tpk-forgot-password';

module(
  'Integration | Component | Prefabs | Tpk-forgot-password-prefab',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

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
        </template>
      );
    }

    test('renders forgot password form with email field', async function (assert) {
      await renderComponent();
      assert.dom(forgotPasswordPageObject.scope).exists();
      assert.dom('[data-test-tpk-forgot-password-form-email]').exists();
      assert.dom(forgotPasswordPageObject.submitButton.scope).exists();
    });

    test('displays default submit button text', async function (assert) {
      await renderComponent();
      assert.strictEqual(
        forgotPasswordPageObject.submitButton.text,
        'Send Reset Link'
      );
    });

    test('displays custom submit button text', async function (assert) {
      await renderComponent({ submitButtonText: 'Envoyer le lien' });
      assert.strictEqual(
        forgotPasswordPageObject.submitButton.text,
        'Envoyer le lien'
      );
    });

  test('uses initial values when provided', async function (assert) {
    await renderComponent({
      initialValues: {
        email: 'test@example.com',
      },
    });
    assert.strictEqual(forgotPasswordPageObject.email.value, 'test@example.com');
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

      await forgotPasswordPageObject.email.fillIn('test@example.com');
      await forgotPasswordPageObject.submitButton.click();

      assert.verifySteps(['onSubmit']);
      assert.deepEqual(receivedData, {
        email: 'test@example.com',
      });
      assert.ok(receivedChangeset instanceof ImmerChangeset);
      assert.strictEqual(receivedChangeset?.get('email'), 'test@example.com');
    });

    test('onSubmit is not called when form is invalid', async function (assert) {
      await renderComponent({
        onSubmit: () => {
          assert.step('onSubmit');
        },
      });

      await forgotPasswordPageObject.email.fillIn('invalid-email');
      await forgotPasswordPageObject.submitButton.click();

      assert.verifySteps([]);
    });
  }
);
