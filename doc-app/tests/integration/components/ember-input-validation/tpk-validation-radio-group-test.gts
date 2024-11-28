import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  click, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupOnerror } from '@ember/test-helpers';
import TpkValidationRadioGroup from '@triptyk/ember-input-validation/components/tpk-validation-radio-group';



module(
  'Integration | Component | tpk-validation-radio-group',
  function (hooks) {
    setupRenderingTest(hooks);

    async function setupComponent(

      value?: string | boolean,
    ) {
      const changeset = new ImmerChangeset({
        radio: value,
      });

      await render(
        <template>
      <TpkValidationRadioGroup
        @mandatory={{true}}
        @label="label"
        @groupLabel="groupLabel"
        @changeset={{changeset}}
        @validationField="radio"
      as |R|>
        <R.Radio @value='good' @label='good' as |T| >
          <T.Input data-test-radio="good"/>
          <T.Label />
        </R.Radio>
        <R.Radio  @value='bad' @label='bad' as |T| >
          <T.Input data-test-radio="bad"/>
          <T.Label />
        </R.Radio>
      </TpkValidationRadioGroup>
      </template>);
      return changeset;
    }

    test('render radio with default structure', async function ( assert) {
      const changeset = await setupComponent( undefined);
      assert.strictEqual(changeset.get('radio'), undefined);
      await click("[data-test-radio='bad']");

      assert.dom("[data-test-radio='bad']").isChecked();
      assert.strictEqual(changeset.get('radio'), 'bad');
      await click("[data-test-radio='good']");
      assert.dom("[data-test-radio='good']").isChecked();
      assert.dom("[data-test-radio='bad']").isNotChecked();
      assert.strictEqual(changeset.get('radio'), 'good');
    });

    test('changeset set value selected the good radio', async function ( assert) {
      await setupComponent( 'good');
      assert.dom("[data-test-radio='good']").isChecked();
    });

    test('must set wrong value type to selected', async function ( assert) {
      setupOnerror(function (err) {
        assert.strictEqual(
          err.message,
          'Assertion Failed: The changeset value must be a string',
        );
      });
      await setupComponent( true);
    });
  },
);
