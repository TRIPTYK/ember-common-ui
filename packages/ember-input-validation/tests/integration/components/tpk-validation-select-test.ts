import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { click, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

module('Integration | Component | tpk-validation-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with default syntax', async function (assert) {
    const options = ['a', 'b', 'c'];
    const changeset = new ImmerChangeset({
      name: undefined,
    });
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
      </TpkValidationSelect>`,
    );

    await click('.tpk-select-button');
    await click('[data-test-option="1"]');

    assert.verifySteps(['change']);

    assert.dom('.tpk-select').hasAttribute('data-has-error', 'false');

    changeset.addError({
      message: 'required',
      value: '',
      originalValue: 'a',
      key: 'name',
    });

    await settled();

    assert.dom('.tpk-select').hasAttribute('data-has-error', 'true');

    assert.dom('.tpk-validation-select-error').exists();
  });
});
