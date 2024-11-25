import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, click, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupOnerror } from '@ember/test-helpers';

interface CurrentTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module(
  'Integration | Component | tpk-validation-radio-group',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function (this: CurrentTestContext) {
      this.changeset = new ImmerChangeset({
        radio: undefined,
      });
    });

    async function setupComponent(
      this: CurrentTestContext,
      value?: string | boolean,
    ) {
      const changeset = new ImmerChangeset({
        radio: value,
      });
      this.set('changeset', changeset);

      await render(hbs`
      <TpkValidationRadioGroup @mandatory={{true}} @groupLabel="groupLabel" @changeset={{this.changeset}} @validationField="radio" as |R|>
        <R.Radio @value='good' @label='good' as |T| >
          <T.Input data-test-radio="good"/>
          <T.Label />
        </R.Radio>
        <R.Radio  @value='bad' @label='bad' as |T| >
          <T.Input data-test-radio="bad"/>
          <T.Label />
        </R.Radio>
      </TpkValidationRadioGroup>
      `);
      return this.changeset;
    }

    test('render radio with default structure', async function (this: CurrentTestContext, assert) {
      await setupComponent.call(this, undefined);
      assert.strictEqual(this.changeset.get('radio'), undefined);
      await click("[data-test-radio='bad']");

      assert.dom("[data-test-radio='bad']").isChecked();
      assert.strictEqual(this.changeset.get('radio'), 'bad');
      await click("[data-test-radio='good']");
      assert.dom("[data-test-radio='good']").isChecked();
      assert.dom("[data-test-radio='bad']").isNotChecked();
      assert.strictEqual(this.changeset.get('radio'), 'good');
    });

    test('changeset set value selected the good radio', async function (this: CurrentTestContext, assert) {
      await setupComponent.call(this, 'good');
      assert.dom("[data-test-radio='good']").isChecked();
    });

    test('must set wrong value type to selected', async function (this: CurrentTestContext, assert) {
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
