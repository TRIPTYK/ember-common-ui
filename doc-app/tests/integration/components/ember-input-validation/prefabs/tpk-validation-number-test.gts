import { module, test } from 'qunit';
import {
  fillIn,
  find,
  render,

  settled,
} from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationNumber from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-number';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';



module(
  'Integration | Component | Prefabs | tpk-validation-number',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(changeset: ImmerChangeset) {
      await render(
        <template>
      <TpkValidationNumber
        @changeset={{changeset}}
        @validationField="number"
        @label="Number validation field"
        class="custom-number-class"
        @step={{0.1}}
      />
    </template>);
    }
    async function renderComponentUnsigned(changeset: ImmerChangeset) {
      await render(<template>
      <TpkValidationNumber
        @changeset={{changeset}}
        @validationField="number"
        @label="Number validation field"
        class="custom-number-class"
        @unsigned={{true}}
        @step={{0.1}}
      />
    </template>);
    }

    function setupChangeset() {
      return new ImmerChangeset({
        number: 0,
      });
    }

    test('Input type must be a number', async function ( assert) {
      const changeset = setupChangeset();
      await renderComponent(changeset);
      await fillIn('input', '2.1');
      assert.dom('input').hasAttribute('type', 'number');
      assert.strictEqual(changeset.get('number'), 2.1);
      await fillIn('input', 'jacques');
      assert.notOk(changeset.get('number'));
    });

    test('Attributes should be passed to the container', async function (assert) {
      const changeset = setupChangeset();
      await renderComponent(changeset);
      assert.dom('[data-test-tpk-prefab-number-container]').hasClass('custom-number-class');
    });

    test('it passes unsigned number', async function ( assert) {
      const changeset = setupChangeset();
      await renderComponentUnsigned(changeset);
      await fillIn('input', '0.1');
      const input = find('input');
      assert.strictEqual(changeset.get('number'), 0.1);
      input?.stepDown();
      input?.stepDown();
      assert.dom('input').hasValue('0');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = setupChangeset();
      await renderComponentUnsigned(changeset);
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'number',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      const changeset = setupChangeset();
      await renderComponent(changeset);
      assertTpkCssClassesExist(assert, 'number');
    });
  },
);
