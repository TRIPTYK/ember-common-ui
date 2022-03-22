import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, triggerEvent } from '@ember/test-helpers';
import { Changeset } from 'ember-changeset';
// @ts-expect-error
import lookupValidator from 'ember-changeset-validations';
import {
  validatePresence,
  // @ts-expect-error
} from 'ember-changeset-validations/validators';

const validations = {
  file: [validatePresence(true)],
};

module('Integration | Component | tpk-validation-file', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with default syntax', async function (assert) {
    const c = Changeset(
      {
        file: undefined,
      },
      lookupValidator(validations),
      validations
    );
    this.set('changeset', c);

    await render(
      hbs`<TpkValidationFile @label="label" @changeset={{this.changeset}} @validationField="file" />`
    );
    assert.dom('[data-test-tpk-file]').exists();
    assert.dom('[data-test-tpk-file-label]').containsText('label');

    await c.validate();

    assert.dom('[data-test-tpk-file].error').exists();
    assert.dom('.tpk-validation-file-error').exists().hasAnyText();

    await triggerEvent('[data-test-tpk-file-input]', 'change', {
      files: [new File(['Ember Rules!'], 'file.txt')],
    });
    assert.dom('[data-test-tpk-file].error').doesNotExist();
  });
});
