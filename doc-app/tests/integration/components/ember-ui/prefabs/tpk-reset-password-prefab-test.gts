import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import { render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkResetPassword from '@triptyk/ember-ui/components/prefabs/tpk-reset-password';
import resetPasswordPageObject from 'doc-app/tests/pages/tpk-reset-password';

module(
  'Integration | Component | Prefabs | Tpk-reset-password-prefab',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

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
        </template>
      );
    }

    test('renders reset password form with password and confirmPassword fields', async function (assert) {
      await renderComponent();
      assert.dom(resetPasswordPageObject.scope).exists();
      assert.dom('[data-test-tpk-reset-password-form-password]').exists();
      assert
        .dom('[data-test-tpk-reset-password-form-confirm-password]')
        .exists();
      assert.dom(resetPasswordPageObject.submitButton.scope).exists();
    });

    test('displays default submit button text', async function (assert) {
      await renderComponent();
      assert.strictEqual(
        resetPasswordPageObject.submitButton.text,
        'Reset Password'
      );
    });

    test('displays custom submit button text', async function (assert) {
      await renderComponent({ submitButtonText: 'Réinitialiser' });
      assert.strictEqual(
        resetPasswordPageObject.submitButton.text,
        'Réinitialiser'
      );
    });

    test('uses initial values when provided', async function (assert) {
      await renderComponent({
        initialValues: {
          password: 'initialPassword',
          confirmPassword: 'initialConfirmPassword',
        },
      });
      assert.strictEqual(
        resetPasswordPageObject.password.value,
        'initialPassword'
      );
      assert.strictEqual(
        resetPasswordPageObject.confirmPassword.value,
        'initialConfirmPassword'
      );
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

      await resetPasswordPageObject.password.fillIn('password123');
      await resetPasswordPageObject.confirmPassword.fillIn('password123');
      await resetPasswordPageObject.submitButton.click();

      assert.verifySteps(['onSubmit']);
      assert.deepEqual(receivedData, {
        password: 'password123',
        confirmPassword: 'password123',
      });
      assert.ok(receivedChangeset instanceof ImmerChangeset);
      assert.strictEqual(receivedChangeset?.get('password'), 'password123');
      assert.strictEqual(
        receivedChangeset?.get('confirmPassword'),
        'password123'
      );
    });

    test('onSubmit is not called when form is invalid', async function (assert) {
      await renderComponent({
        onSubmit: () => {
          assert.step('onSubmit');
        },
      });

      await resetPasswordPageObject.password.fillIn('short');
      await resetPasswordPageObject.confirmPassword.fillIn('short');
      await resetPasswordPageObject.submitButton.click();

      assert.verifySteps([]);
    });

    test('onSubmit is not called when password is empty', async function (assert) {
      await renderComponent({
        onSubmit: () => {
          assert.step('onSubmit');
        },
      });

      await resetPasswordPageObject.password.fillIn('');
      await resetPasswordPageObject.confirmPassword.fillIn('password123');
      await resetPasswordPageObject.submitButton.click();

      assert.verifySteps([]);
    });
  }
);
