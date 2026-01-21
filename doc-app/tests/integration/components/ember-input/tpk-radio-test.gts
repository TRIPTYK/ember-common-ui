import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { getOwner } from '@ember/owner';
import ApplicationInstance from '@ember/application/instance';
import TpkRadio from '@triptyk/ember-input/components/tpk-radio';
import catchState from 'doc-app/helpers/catch-state';

module('Integration | Component | ui/radio', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders complex', async function (assert) {
    const setRadio = (selected: string, e: Event) => {
      assert.step('check');
      assert.strictEqual(typeof selected, 'string');
      assert.true(e instanceof Event);

      assert.strictEqual(selected, 'jean');
    };

    await render(
      <template>
        <TpkRadio
          @label="Label"
          @selected="luc"
          @value="jean"
          @name="cule"
          @onChange={{setRadio}}
          as |C|
        >
          <C.Input class="text-yellow-300" />
          <C.Label class="text-blue-300" />
        </TpkRadio>
      </template>
    );

    await click('label');
    assert.dom('input.text-yellow-300').exists();
    assert.dom('label.text-blue-300').exists();

    assert.dom('label').containsText('Label');

    assert.verifySteps(['check']);
  });

  test('input yield only', async function (assert) {
    await render(
      <template>
        <TpkRadio
          @label="label"
          @selected="luc"
          @value="jean"
          @name="cule"
          as |O|
        >
          {{catchState O}}
        </TpkRadio>
      </template>
    );

    const { state } = (getOwner(this) as ApplicationInstance).lookup(
      'service:catch-state'
    ) as { state: Record<string, unknown> };

    assert.strictEqual(typeof state['Input'], 'object');
    assert.strictEqual(typeof state['onChange'], 'function');
    assert.strictEqual(typeof state['Label'], 'object');
    assert.strictEqual(typeof state['changeEvent'], 'string');
    assert.strictEqual(typeof state['guid'], 'string');
  });
});
