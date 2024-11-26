import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, click, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupOnerror } from '@ember/test-helpers';
import TpkValidationRadioGroup from '@triptyk/ember-input-validation/components/tpk-validation-radio-group';

interface ThisTestContext extends TestContext {
}

module(
  'Integration | Component | tpk-validation-radio-group',
  function (hooks) {
    setupRenderingTest(hooks);

    async function setupComponent(
      this: ThisTestContext,
      value?: string | boolean,
    ) {
      const changeset = new ImmerChangeset({
        radio: value,
      });

      await render<ThisTestContext>(
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

    test('render radio with default structure', async function (this: ThisTestContext, assert) {
      const changeset = await setupComponent.call(this, undefined);
      assert.strictEqual(changeset.get('radio'), undefined);
      await click("[data-test-radio='bad']");

      assert.dom("[data-test-radio='bad']").isChecked();
      assert.strictEqual(changeset.get('radio'), 'bad');
      await click("[data-test-radio='good']");
      assert.dom("[data-test-radio='good']").isChecked();
      assert.dom("[data-test-radio='bad']").isNotChecked();
      assert.strictEqual(changeset.get('radio'), 'good');
    });

    test('changeset set value selected the good radio', async function (this: ThisTestContext, assert) {
      await setupComponent.call(this, 'good');
      assert.dom("[data-test-radio='good']").isChecked();
    });

    test('must set wrong value type to selected', async function (this: ThisTestContext, assert) {
      setupOnerror(function (err) {
        assert.strictEqual(
          err.message,
          'Assertion Failed: The changeset value must be a string',
        );
      });
      await setupComponent.call(this, true);
    });
  },
);
