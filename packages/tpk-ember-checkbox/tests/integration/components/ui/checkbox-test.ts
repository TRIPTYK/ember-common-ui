/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | ui/checkbox', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders default', async function (assert) {
    this.set('setChecked', (checked: boolean, value: string, e: Event) => {
      assert.step('check');
      assert.strictEqual(typeof checked, 'boolean');
      assert.strictEqual(typeof value, 'string');
      assert.true(e instanceof Event);

      assert.true(checked);
    });

    await render(hbs`
      <Ui::Checkbox 
        data-test-checkbox
        @label='Label'
        @checked={{false}}
        @onChange={{this.setChecked}}
      />
    `);

    await click('[data-test-checkbox] > label');

    assert.dom('[data-test-checkbox] > label').containsText('Label');

    assert.verifySteps(['check']);
  });

  test('it renders complex', async function (assert) {
    this.set('setChecked', (checked: boolean, value: string, e: Event) => {
      assert.step('check');
      assert.strictEqual(typeof checked, 'boolean');
      assert.strictEqual(typeof value, 'string');
      assert.true(e instanceof Event);

      assert.true(checked);
    });

    await render(hbs`
        <Ui::Checkbox
          @label='Label'
          @checked={{false}}
          @onChange={{this.setChecked}}
          data-test-checkbox
          as |C|
        >
          <C.Input class='text-yellow-300' />
          <C.Label class='text-blue-300' />
        </Ui::Checkbox>
    `);

    await click('[data-test-checkbox] > label');
    assert.dom('[data-test-checkbox] > input.text-yellow-300').exists();
    assert.dom('[data-test-checkbox] > label.text-blue-300').exists();

    assert.dom('[data-test-checkbox] > label').containsText('Label');

    assert.verifySteps(['check']);
  });
});
