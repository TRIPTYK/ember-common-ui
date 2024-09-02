import { module, test } from 'qunit';
import { fillIn, render, type TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';

module(
  'Integration | Component | Prefabs | tpk-validation-integer',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent() {
      await render(hbs`
      <Prefabs::TpkValidationInteger
        @changeset={{this.changeset}}
        @validationField="integer"
        @label="Integer validation field"
      />
    `);
    }
    function setupChangeset(this: TestContext, integer: number) {
      const changeset = new ImmerChangeset({
        integer,
      });

      this.set('changeset', changeset);
      return changeset;
    }

    test('the type of the input is number', async function (assert) {
      setupChangeset.call(this, 2);
      await renderComponent();

      assert.dom('input').hasAttribute('type', 'number');
    });

    test('the input is invalid when the value is not an integer', async function (assert) {
      const changeset = setupChangeset.call(this, 0);
      await renderComponent();
      await fillIn('input', '2.5');
      await this.pauseTest();
      assert.ok(changeset.get('integer') === 2.5);
    });
  },
);
