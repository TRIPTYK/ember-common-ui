import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, click, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

interface CurrentTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module('Integration | Component | tpk-validation-radio', function (hooks) {
  setupRenderingTest(hooks);

  async function setupComponent(this: CurrentTestContext) {
    const values = ['good', 'bad', 'ugly'];
    const changeset = new ImmerChangeset({
      radio: undefined,
    });
    this.set('changeset', changeset);
    this.set('good', values[0]);
    this.set('bad', values[1]);

    await render(
      hbs`
      <TpkValidationRadio @changeset={{this.changeset}} @validationField='radio' @value={{this.good}} @label='good'  as |T| >
          <T.Input data-test-radio="good"/>
          <T.Label />
      </TpkValidationRadio>
      <TpkValidationRadio @changeset={{this.changeset}} @validationField='radio' @value={{this.bad}} @label='bad'  as |T| >
          <T.Input data-test-radio="bad"/>
          <T.Label />
      </TpkValidationRadio>
     `,
    );
    return changeset;
  }

  test('render radio with default structure', async function (this: CurrentTestContext, assert) {
    await setupComponent.call(this);
    assert.dom('[data-test-tpk-label]').exists();
    assert.dom('[data-test-tpk-radio-input]').exists();
  });

  test('It changes data on click radio', async function (this: CurrentTestContext, assert) {
    await setupComponent.call(this);
    assert.strictEqual(this.changeset.get('radio'), undefined);
    assert.dom("[data-test-radio='good']").isNotChecked();

    await click("[data-test-radio='good']");

    assert.dom("[data-test-radio='good']").isChecked();
    assert.dom("[data-test-radio='bad']").isNotChecked();
    assert.strictEqual(this.changeset.get('radio'), 'good');

    await click("[data-test-radio='bad']");

    assert.dom("[data-test-radio='bad']").isChecked();
    assert.strictEqual(this.changeset.get('radio'), 'bad');
  });
});
