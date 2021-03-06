import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { fillIn, render } from '@ember/test-helpers';
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

module('Integration | Component | tpk-validation-textarea', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with default syntax', async function (assert) {
    this.set(
      'changeset',
      Changeset(
        {
          name: 'a',
        },
        lookupValidator(validations),
        validations
      )
    );

    await render(
      hbs`<TpkValidationTextarea @label="label" @changeset={{this.changeset}} @validationField="name" />`
    );
    assert.dom('[data-test-tpk-textarea]').exists();
    assert.dom('[data-test-tpk-textarea-label]').containsText('label');
    assert.dom('[data-test-tpk-textarea-input]').hasValue('a');

    await fillIn('[data-test-tpk-textarea-input]', '');
    assert.dom('[data-test-tpk-textarea-input]').hasNoText();
    assert
      .dom('[data-test-tpk-textarea]')
      .hasAttribute('data-has-error', 'true');
    assert.dom('.tpk-validation-textarea-error').exists().hasAnyText();
  });
});
