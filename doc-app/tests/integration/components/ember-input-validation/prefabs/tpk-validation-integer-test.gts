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
import TpkValidationInteger from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-integer';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';



module(
  'Integration | Component | Prefabs | tpk-validation-integer',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(params: { changeset: ImmerChangeset; disabled?: boolean }) {
      await render(<template>
      <TpkValidationInteger
      @changeset={{params.changeset}}
      @validationField="integer"
      @label="Integer validation field"
      class="custom-integer-class"
      @disabled={{params.disabled}}
      />
    </template>);
    }

    async function renderComponentUnsigned(params: { changeset: ImmerChangeset }) {
      await render(<template>
      <TpkValidationInteger
        @changeset={{params.changeset}}
        @validationField="integer"
        @label="Integer validation field"
        class="custom-integer-class"
        @unsigned={{true}}
      />
    </template>);
    }

    function setupChangeset() {
      const changeset = new ImmerChangeset({
        integer: 0,
      });

      return changeset;
    }

    test('Input type must be a number', async function ( assert) {
      const changeset = setupChangeset();
      await renderComponent({changeset});
      await fillIn('input', '2');
      assert.dom('input').hasAttribute('type', 'number');
      assert.strictEqual(changeset.get('integer'), 2);
      await fillIn('input', 'jacques');
      assert.notOk(changeset.get('integer'));
    });

    test('Input does not allow dot and comma', async function ( assert) {
      const changeset =  setupChangeset();
      await renderComponent({changeset});
      await fillIn('input', ',');
      assert.notOk(changeset.get('integer'));
      await fillIn('input', '.');
      assert.notOk(changeset.get('integer'));
      await fillIn('input', '2');
      assert.strictEqual(changeset.get('integer'), 2);
    });

    test('Attributes should be passed to the container', async function (assert) {
      const changeset = setupChangeset();
      await renderComponent({changeset});
      assert.dom('[data-test-tpk-prefab-integer-container]').hasClass('custom-integer-class');
    });

    test('it passes unsigned integer', async function ( assert) {
      const changeset =  setupChangeset();
      await renderComponentUnsigned({changeset});
      await fillIn('input', '1');
      const input = find('input');
      assert.strictEqual(changeset.get('integer'), 1);
      input?.stepDown();
      input?.stepDown();
      assert.dom('input').hasValue('0');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = setupChangeset();
      await renderComponentUnsigned({changeset});
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'integer',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      await assertDataHasErrorAttribute(assert, changeset, 'integer');
      assert.dom('.tpk-validation-errors span').hasText('required');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      const changeset = setupChangeset();
      await renderComponent({ changeset });
      await assertTpkCssClassesExist(assert,'integer');
    });

    test('@disabled disables the input', async function(assert) {
      const changeset = setupChangeset();
      await renderComponent({
        disabled: true,
        changeset
      });
      assert.dom(`[data-test-tpk-integer-input]`).hasAttribute('disabled');
    });
  },
);
