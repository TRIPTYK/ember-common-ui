import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { click, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { selectChoose } from 'ember-power-select/test-support';

module('Integration | Component | tpk-validation-select', function (hooks) {
  setupRenderingTest(hooks);

  async function renderComponent() {
    await render(
      hbs`
        <TpkValidationSelect @onChange={{this.onChange}} @label="label" @changeset={{this.changeset}} @validationField="name" @options={{this.options}} @selected={{this.selected}} as |T|>
          <T.Option as |O|>
              {{O.option}}
          </T.Option>
        </TpkValidationSelect>`,
    );
  }

  test('It changes data-has-error attribue on error', async function (assert) {
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

    await renderComponent();

    await selectChoose('.tpk-select', 'a');

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
  });
});
