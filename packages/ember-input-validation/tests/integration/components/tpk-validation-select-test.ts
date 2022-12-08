import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { click, render } from '@ember/test-helpers';
import { Changeset } from 'ember-changeset';
// @ts-expect-error
import lookupValidator from 'ember-changeset-validations';
import {
  validatePresence,
  // @ts-expect-error
} from 'ember-changeset-validations/validators';

const validations = {
  name: [validatePresence(true)],
};

module('Integration | Component | tpk-validation-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with default syntax', async function (assert) {
    const options = ['a', 'b', 'c'];
    const changeset = Changeset(
      {
        name: undefined,
      },
      lookupValidator(validations),
      validations
    );
    this.set('changeset', changeset);

    this.set('options', options);
    this.set('selected', undefined);
    this.set('onChange', () => {
      assert.step('change');
    });

    await render(
      hbs`
      <TpkValidationSelect @onChange={{this.onChange}} @label="label" @changeset={{this.changeset}} @validationField="name" @options={{this.options}} @selected={{this.selected}}>
        <:option as |o|>
          {{o}}
        </:option>
        <:selected as |s|>
          {{s}}
        </:selected>
      </TpkValidationSelect>`
    );

    await click('.tpk-select-button');
    await click('[data-test-option="1"]');

    assert.verifySteps(['change']);

    assert.dom('.tpk-select').hasAttribute('data-has-error', 'false');

    await changeset.validate();

    assert.dom('.tpk-select').hasAttribute('data-has-error', 'true');

    assert.dom('.tpk-validation-select-error').exists();
  });
});
