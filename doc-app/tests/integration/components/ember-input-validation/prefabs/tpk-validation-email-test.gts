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
      assert.dom('[data-test-tpk-email-input]').hasNoText();
      assert
        .dom('[data-test-tpk-email]')
        .hasAttribute('data-has-error', 'true');
    });

      test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
       const changeset = setupChangeset.call(this, 'email');
      await renderComponent(changeset);
      assert.dom('.tpk-email-container').exists().hasAttribute('data-test-tpk-email');
      assert.dom('.tpk-email-container .tpk-email-input').exists()
      assert.dom('.tpk-email-container .tpk-validation-errors').exists()
      assert.dom('.tpk-email-container .tpk-label').exists()
      assert.dom('label').hasClass('tpk-email-container');
      assert.dom('input').hasClass('tpk-email-input');
      assert.dom('label > div:first-of-type').hasClass('tpk-label', 'The first div inside label has the class tpk-label.');
      assert.dom('label > div:nth-of-type(2)').hasClass('tpk-validation-errors', 'The second div inside label has the class tpk-validation-errors.');
    });
  },
);