import { module, test } from 'qunit';
import {
  render,
  settled,
  triggerEvent,
  type TestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';

module(
  'Integreation | Component | Prefabs | tpk-validation-email',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent() {
      await render(hbs`
      <Prefabs::TpkValidationEmail
        @changeset={{this.changeset}}
        @validationField="email"
        @label="Email validation field"
      />
    `);
    }

    function setupChangeset(this: TestContext, email: string) {
      const changeset = new ImmerChangeset({
        email,
      });

      this.set('changeset', changeset);
      return changeset;
    }

    test('the type of the input is email', async function (assert) {
      setupChangeset.call(this, 'email');

      await renderComponent();

      await this.pauseTest();
      assert.dom('input').hasAttribute('type', 'email');
    });

    test('it send error went email not correct', async function (assert) {
      setupChangeset.call(this, 'not-good-email-format');
      await renderComponent();

      await triggerEvent('[data-test-input="email"] input', 'blur');

      assert.notOk(
        this.element
          .querySelector('[data-test-input="email"] input')
          .checkValidity(),
        'Email format is invalid and should not be valid',
      );
    });

    test('it returns correct email', async function (assert) {
      setupChangeset.call(this, 'vali@email.com');
      await renderComponent();

      await triggerEvent('[data-test-input="email"] input', 'blur');

      assert.ok(
        this.element
          .querySelector('[data-test-input="email"] input')
          .checkValidity(),
        'Email format is valid',
      );
    });

    test('It changes data-has-error attribue on error', async function (assert) {
      const changeset = setupChangeset.call(this, '');

      await renderComponent();

      changeset.addError({
        message: 'required',
        value: '',
        originalValue: '',
        key: 'email',
      });
      await settled();
      assert.dom('[data-test-tpk-input-input]').hasNoText();
      assert
        .dom('[data-test-tpk-input]')
        .hasAttribute('data-has-error', 'true');
    });
  },
);
