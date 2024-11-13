import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { fillIn, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

module('Integration | Component | tpk-validation-textarea', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with default syntax', async function (assert) {
    const immerChangeset = new ImmerChangeset({
      name: 'a',
    });

    this.set('changeset', immerChangeset);

    await render(
      hbs`<TpkValidationTextarea @label="label" @changeset={{this.changeset}} @validationField="name" as |T|>
          <T.Input />
          <T.Label />
      </TpkValidationTextarea>`,
    );
    assert.dom('[data-test-tpk-textarea]').exists();
    assert.dom('[data-test-tpk-label]').containsText('label');
    assert.dom('[data-test-tpk-textarea-input]').hasValue('a');

    await fillIn('[data-test-tpk-textarea-input]', '');
    assert.strictEqual(immerChangeset.get('name'), '');

    immerChangeset.addError({
      message: 'required',
      value: '',
      originalValue: 'a',
      key: 'name',
    });

    await settled();

    assert
      .dom('[data-test-tpk-textarea]')
      .hasAttribute('data-has-error', 'true');
  });
});
