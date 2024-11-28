
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import CatchState from 'doc-app/services/catch-state';
import TpkCheckbox from '@triptyk/ember-input/components/tpk-checkbox';
import catchState from 'doc-app/helpers/catch-state';



module('Integration | Component | ui/checkbox', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders complex', async function (assert) {
    const setChecked = (checked: boolean, value: string, e: Event) => {
      assert.step('check');
      assert.strictEqual(typeof checked, 'boolean');
      assert.strictEqual(typeof value, 'string');
      assert.true(e instanceof Event);

      assert.true(checked);
    };

    await render(<template>
        <TpkCheckbox
          @label='Label'
          @checked={{false}}
          @onChange={{setChecked}}
          as |C|
        >
          <C.Input class='text-yellow-300' />
          <C.Label class='text-blue-300' />
        </TpkCheckbox>
    </template>);

    await click('label');
    assert.dom('input.text-yellow-300').exists();
    assert.dom('label.text-blue-300').exists();

    assert.dom('label').containsText('Label');

    assert.verifySteps(['check']);
  });

  test('input yield only', async function (assert) {
    await render(
      <template><TpkCheckbox @label="label" @checked={{true}} as |O|>
        {{catchState O}}
      </TpkCheckbox>
      </template>,
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { state }: { state: any } = (
      getOwner(this) as ApplicationInstance
    ).lookup('service:catch-state') as CatchState;

    assert.strictEqual(typeof state.Input, 'object');
    assert.strictEqual(typeof state.onChange, 'function');
    assert.strictEqual(typeof state.Label, 'object');
    assert.strictEqual(typeof state.changeEvent, 'string');
    assert.strictEqual(typeof state.guid, 'string');
  });

  test('Accessibility', async function (assert) {
    await render(
      <template><TpkCheckbox @label="label" @checked={{true}} /></template>
    );

    await a11yAudit();
    assert.expect(0);
  });
});
