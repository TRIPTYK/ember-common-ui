import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, click, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupOnerror } from '@ember/test-helpers';

module(
  'Integration | Component | tpk-validation-radio-group',
  function (hooks) {
    setupRenderingTest(hooks);

    async function setupComponent(this: TestContext, value: string) {
      const changeset = new ImmerChangeset({
        radio: value,
      });
      this.set('changeset', changeset);

      await render(hbs`
      <TpkValidationRadioGroup @mandatory={{true}} @groupLabel="groupLabel" @changeset={{this.changeset}} @validationField="radio" as |R|>
        <R.Radio @value='good'}@label='good' data-test-radio="good" as |T| >
          <T.Input />
          <T.Label />
        </R.Radio>
        <R.Radio  @value='bad' @label='bad' data-test-radio="bad" as |T| >
          <T.Input />
          <T.Label />
        </R.Radio>
      </TpkValidationRadioGroup>
      `);
      return this.changeset;
    }
    test<TestContext>('render radio with default structure', async function (this: TestContext, assert) {
      await setupComponent.call(this, undefined);
      assert.strictEqual(this.changeset.get('radio'), undefined);
      await click("[data-test-radio='bad'] [data-test-tpk-radio-input]");
      assert
        .dom("[data-test-radio='bad'] [data-test-tpk-radio-input]")
        .isChecked();
      assert.strictEqual(this.changeset.get('radio'), 'bad');
      await click("[data-test-radio='good'] [data-test-tpk-radio-input]");
      assert
        .dom("[data-test-radio='good'] [data-test-tpk-radio-input]")
        .isChecked();
      assert
        .dom("[data-test-radio='bad'] [data-test-tpk-radio-input]")
        .isNotChecked();
      assert.strictEqual(this.changeset.get('radio'), 'good');
    });

    test<TestContext>('changeset set value selected the good radio', async function (this: TestContext, assert) {
      await setupComponent.call(this, 'good');
      assert
        .dom("[data-test-radio='good'] [data-test-tpk-radio-input]")
        .isChecked();
    });

    test<TestContext>('must set wrong value type to selected', async function (this: TestContext, assert) {
      await setupOnerror(function (err) {
        console.log(err);

        assert.strictEqual(
          err.message,
          'Assertion Failed: The changeset value must be a string',
        );
      });
      await setupComponent.call(this, true);
    });
  },
);
