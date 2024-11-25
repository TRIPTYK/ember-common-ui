import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { fillIn, render } from '@ember/test-helpers';
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
    assert.dom('textarea').exists();
    assert.dom('[data-test-tpk-label]').containsText('label');
    assert.dom('[data-test-tpk-textarea-input]').hasValue('a');

    await fillIn('[data-test-tpk-textarea-input]', '');
    assert.strictEqual(immerChangeset.get('name'), '');
  });
});
