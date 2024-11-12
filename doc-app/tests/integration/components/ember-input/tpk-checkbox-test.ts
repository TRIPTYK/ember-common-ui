/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import CatchState from 'doc-app/services/catch-state';

module('Integration | Component | ui/checkbox', function (hooks) {
  setupRenderingTest(hooks);

  test('class/less by default', async function (assert) {
    this.set('setChecked', () => {});

    await render(hbs`
      <TpkCheckbox
        data-test-checkbox
        @label='Label'
        @classless={{this.classless}}
        @checked={{false}}
        @onChange={{this.setChecked}}
      as |C|>
        <C.Label />
        <C.Input />
      </TpkCheckbox>
    `);

    findAll('*')
      .filter((e) => e.id !== 'modal-overlays')
      .forEach((e) => {
        assert.dom(e).hasClass(/tpk-.*/);
      });

    this.set('classless', true);

    findAll('*').forEach((e) => {
      assert.dom(e).hasNoClass(/tpk-.*/);
    });
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
        <TpkCheckbox
          @label='Label'
          @checked={{false}}
          @onChange={{this.setChecked}}
          data-test-checkbox
          as |C|
        >
          <C.Input class='text-yellow-300' />
          <C.Label class='text-blue-300' />
        </TpkCheckbox>
    `);

    await click('[data-test-checkbox] > label');
    assert.dom('[data-test-checkbox] > input.text-yellow-300').exists();
    assert.dom('[data-test-checkbox] > label.text-blue-300').exists();

    assert.dom('[data-test-checkbox] > label').containsText('Label');

    assert.verifySteps(['check']);
  });

  test('input yield only', async function (assert) {
    await render(
      hbs`<TpkCheckbox @onChange={{this.change}} @label="label" @checked={{true}} as |O|>
        {{catch-state O}}
      </TpkCheckbox>`,
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
      hbs`<TpkCheckbox @onChange={{this.change}} @label="label" @checked={{true}} />`,
    );

    await a11yAudit();
    assert.expect(0);
  });
});
