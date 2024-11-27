import { module, test } from 'qunit';
import { render, type TestContext } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationEmail from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-email';
import { cssClassesExist } from '../generic-test-functions/css-classes-exist';
import { dataHasErrorAttribute } from '../generic-test-functions/data-has-error-attribute';

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
      await dataHasErrorAttribute(assert,changeset,'email');
    });

      test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
       const changeset = setupChangeset.call(this, 'email');
      await renderComponent(changeset);
      await cssClassesExist(assert,'email');
    });
  },
);