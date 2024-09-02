import { module, test } from 'qunit';
import {
  fillIn,
  find,
  render,
  type TestContext,
  settled,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';

module(
  'Integration | Component | Prefabs | tpk-validation-number',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent() {
      await render(hbs`
      <Prefabs::TpkValidationNumber
        @changeset={{this.changeset}}
        @validationField="number"
        @label="Number validation field"
        class="custom-number-class"
        @step={{0.1}}
      />
    `);
    }
    async function renderComponentUnsigned() {
      await render(hbs`
      <Prefabs::TpkValidationNumber
        @changeset={{this.changeset}}
        @validationField="number"
        @label="Number validation field"
        class="custom-number-class"
        @unsigned={{true}}
        @step={{0.1}}
      />
    `);
    }

    function setupChangeset(this: TestContext) {
      const changeset = new ImmerChangeset({
        number: 0,
      });

      this.set('changeset', changeset);
      return changeset;
    }

    test('Input type must be a number', async function (assert) {
      setupChangeset.call(this);
      await renderComponent();
      await fillIn('input', '2.1');
      assert.dom('input').hasAttribute('type', 'number');
      assert.strictEqual(this.changeset.get('number'), 2.1);
      await fillIn('input', 'jacques');
      assert.notOk(this.changeset.get('number'));
    });

    test('Attributes should be passed to the input', async function (assert) {
      setupChangeset.call(this);
      await renderComponent();
      assert.dom('.tpk-input').hasClass('custom-number-class');
    });

    test('it passes unsigned number', async function (assert) {
      setupChangeset.call(this);
      await renderComponentUnsigned();
      await fillIn('input', '0.1');
      let input = find('input');
      assert.strictEqual(this.changeset.get('number'), 0.1);
      input?.stepDown();
      input?.stepDown();
      assert.dom('input').hasValue('0');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await setupChangeset.call(this);
      await renderComponentUnsigned();
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'number',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('t:required:()');
    });
  },
);
