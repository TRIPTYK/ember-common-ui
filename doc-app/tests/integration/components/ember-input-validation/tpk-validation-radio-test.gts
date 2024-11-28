import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  click, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationRadio from '@triptyk/ember-input-validation/components/tpk-validation-radio';



module('Integration | Component | tpk-validation-radio', function (hooks) {
  setupRenderingTest(hooks);

  async function setupComponent() {
    const values = ['good', 'bad', 'ugly'];
    const changeset = new ImmerChangeset({
      radio: undefined,
    });
    const good = values[0] as string;
    const bad = values[1] as string;

    await render(
      <template>
      <TpkValidationRadio @changeset={{changeset}} @validationField='radio' @value={{good}} @label='good'  as |T| >
          <T.Input data-test-radio="good"/>
          <T.Label />
      </TpkValidationRadio>
      <TpkValidationRadio @changeset={{changeset}} @validationField='radio' @value={{bad}} @label='bad'  as |T| >
          <T.Input data-test-radio="bad"/>
          <T.Label />
      </TpkValidationRadio>
     </template>,
    );
    return changeset;
  }

  test('render radio with default structure', async function ( assert) {
    await setupComponent();
    assert.dom('[data-test-tpk-label]').exists();
    assert.dom('[data-test-tpk-radio-input]').exists();
  });

  test('It changes data on click radio', async function ( assert) {
    const changeset = await setupComponent();
    assert.strictEqual(changeset.get('radio'), undefined);
    assert.dom("[data-test-radio='good']").isNotChecked();

    await click("[data-test-radio='good']");

    assert.dom("[data-test-radio='good']").isChecked();
    assert.dom("[data-test-radio='bad']").isNotChecked();
    assert.strictEqual(changeset.get('radio'), 'good');

    await click("[data-test-radio='bad']");

    assert.dom("[data-test-radio='bad']").isChecked();
    assert.strictEqual(changeset.get('radio'), 'bad');
  });
});
