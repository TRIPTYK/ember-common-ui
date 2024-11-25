import { module, test } from 'qunit';
import { render, settled, type TestContext } from '@ember/test-helpers';
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
      assert.dom('input').hasAttribute('type', 'email');
    });

    test('It changes data-has-error attribute on error', async function (assert) {
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
