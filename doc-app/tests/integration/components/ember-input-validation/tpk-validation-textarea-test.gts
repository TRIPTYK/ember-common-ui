import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationTextarea from '@triptyk/ember-input-validation/components/tpk-validation-textarea';



module('Integration | Component | tpk-validation-textarea', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with default syntax', async function (assert) {
    const immerChangeset = new ImmerChangeset({
      name: 'a',
    });

    await render(
      <template>
        <TpkValidationTextarea @label="label" @changeset={{immerChangeset}} @validationField="name" as |T|>
          <T.Input />
          <T.Label />
        </TpkValidationTextarea>
      </template>
    );
    assert.dom('textarea').exists();
    assert.dom('[data-test-tpk-label]').containsText('label');
    assert.dom('[data-test-tpk-textarea-input]').hasValue('a');

    await fillIn('[data-test-tpk-textarea-input]', '');
    assert.strictEqual(immerChangeset.get('name'), '');
  });
});
