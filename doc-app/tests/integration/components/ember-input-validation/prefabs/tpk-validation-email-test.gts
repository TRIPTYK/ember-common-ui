import { module, test } from 'qunit';
import { render, settled, type TestContext } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationEmail from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-email';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module(
  'Integration | Component | Prefabs | tpk-validation-email',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(changeset: ImmerChangeset) {
      await render<ThisTestContext>(<template>
      <TpkValidationEmail
        @changeset={{changeset}}
        @validationField="email"
        @label="Email validation field"
      />
    </template>);
    }

    function setupChangeset(this: ThisTestContext, email: string) {
      return new ImmerChangeset({
        email,
      });
    }

    test('the type of the input is email', async function (this: ThisTestContext, assert) {
      const changeset = setupChangeset.call(this, 'email');
      await renderComponent(changeset);
      assert.dom('input').hasAttribute('type', 'email');
    });

    test('It changes data-has-error attribute on error', async function (this: ThisTestContext,assert) {
      const changeset = setupChangeset.call(this, '');

      await renderComponent(changeset);

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
