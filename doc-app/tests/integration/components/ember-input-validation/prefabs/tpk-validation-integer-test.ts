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
        class="custom-integer-class"
      />
    `);
    }
    function setupChangeset(this: TestContext) {
      const changeset = new ImmerChangeset({
        integer: 0,
      });

      this.set('changeset', changeset);
      return changeset;
    }

    test('Input type must be a number', async function (assert) {
      setupChangeset.call(this);
      await renderComponent();
      await fillIn('input', '2');
      assert.dom('input').hasAttribute('type', 'number');
      assert.strictEqual(this.changeset.get('integer'), 2);
      await fillIn('input', 'jacques');
      assert.notOk(this.changeset.get('integer'));
    });

    test('Input does not allow dot and comma', async function (assert) {
      setupChangeset.call(this);
      await renderComponent();
      await fillIn('input', ',');
      assert.notOk(this.changeset.get('integer'));
      await fillIn('input', '.');
      assert.notOk(this.changeset.get('integer'));
      await fillIn('input', '2');
      assert.strictEqual(this.changeset.get('integer'), 2);

    });

    test('Attributes should be passed to the input', async function (assert) {
      setupChangeset.call(this);
      await renderComponent();
      assert.dom('.tpk-input').hasClass('custom-integer-class');
    });
  },
);
