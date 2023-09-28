import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

module('Integration | Component | tpk-validation-file', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with default syntax', async function (assert) {
    const changeset = new ImmerChangeset<{
      file: File | undefined;
    }>({
      file: undefined,
    });

    this.set('changeset', changeset);

    await render(
      hbs`<TpkValidationFile @label="label" @changeset={{this.changeset}} @validationField="file" />`,
    );
    assert.dom('[data-test-tpk-file]').exists();
    assert.dom('[data-test-tpk-file-label]').containsText('label');

    changeset.addError({
      message: 'required',
      value: '',
      originalValue: 'a',
      key: 'file',
    });
    await settled();

    assert.dom('[data-test-tpk-file]').hasAttribute('data-has-error', 'true');
    assert.dom('.tpk-validation-file-error').exists().hasAnyText();

    await triggerEvent('[data-test-tpk-file-input]', 'change', {
      files: [new File(['Ember Rules!'], 'file.txt')],
    });
    assert.true(changeset.get('file') instanceof File);
  });
});
