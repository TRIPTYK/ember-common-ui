import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, click, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

module('Integration | Component | tpk-validation-radio', function (hooks) {
  setupRenderingTest(hooks);

  async function setupComponent(this: TestContext) {
    const values = ['good', 'bad', 'ugly'];
    const changeset = new ImmerChangeset({
      radio: undefined,
    });
    this.set('changeset', changeset);
    this.set('good', values[0]);
    this.set('bad', values[1]);

    await render(
      hbs`
      <TpkValidationRadio @changeset={{this.changeset}} @validationField={{'radio'}} @value={{this.good}} data-test-radio="good" as |T| >
          <T.Input />
          <T.Label />
      </TpkValidationRadio>
      <TpkValidationRadio @changeset={{this.changeset}} @validationField={{'radio'}} @value={{this.bad}} data-test-radio="bad" as |T| >
          <T.Input />
          <T.Label />
      </TpkValidationRadio>
     `,
    );
    return changeset;
  }

  test('render radio with default structure', async function (assert) {
    await setupComponent.call(this);
    assert.dom('[data-test-tpk-radio-label]').exists();
    assert.dom('[data-test-tpk-radio]').exists();
    assert.dom('[data-test-tpk-radio-input]').exists();
  });

  test('It changes data on click radio', async function (assert) {
    await setupComponent.call(this);
    assert.strictEqual(this.changeset.get('radio'), undefined);
    assert
      .dom("[data-test-radio='good'] [data-test-tpk-radio-input]")
      .isNotChecked();

    await click("[data-test-radio='good'] [data-test-tpk-radio-input]");

    assert
      .dom("[data-test-radio='good'] [data-test-tpk-radio-input]")
      .isChecked();
    assert
      .dom("[data-test-radio='bad'] [data-test-tpk-radio-input]")
      .isNotChecked();
    assert.strictEqual(this.changeset.get('radio'), 'good');

    await click("[data-test-radio='bad'] [data-test-tpk-radio-input]");

    assert
      .dom("[data-test-radio='bad'] [data-test-tpk-radio-input]")
      .isChecked();
    assert.strictEqual(this.changeset.get('radio'), 'bad');
  });
});
