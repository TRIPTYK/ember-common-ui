/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import click from '@ember/test-helpers/dom/click';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'dummy/tests/dummy/app/services/catch-state';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | ui/radio', function (hooks) {
  setupRenderingTest(hooks);

  test('class/less by default', async function (assert) {
    this.set('setRadio', () => {});

    await render(hbs`
      <TpkRadio 
        data-test-radio
        @label='Label'
        @classless={{this.classless}}
        @selected="luc"
        @value="jean"
        @name="cule"
        @onChange={{this.setRadio}}
      />
    `);

    findAll('*').forEach((e) => {
      assert.dom(e).hasClass(/tpk-.*/);
    });

    this.set('classless', true);

    findAll('*').forEach((e) => {
      assert.dom(e).hasNoClass(/tpk-.*/);
    });
  });

  test('it renders complex', async function (assert) {
    this.set('setRadio', (selected: string, e: Event) => {
      assert.step('check');
      assert.strictEqual(typeof selected, 'string');
      assert.true(e instanceof Event);

      assert.strictEqual(selected, 'jean');
    });

    await render(hbs`
        <TpkRadio
          @label='Label'
          @selected="luc"
          @value="jean"
          @name="cule"
          @onChange={{this.setRadio}}
          data-test-radio
          as |C|
        >
          <C.Input class='text-yellow-300' />
          <C.Label class='text-blue-300' />
        </TpkRadio>
    `);

    await click('[data-test-radio] > label');
    assert.dom('[data-test-radio] > input.text-yellow-300').exists();
    assert.dom('[data-test-radio] > label.text-blue-300').exists();

    assert.dom('[data-test-radio] > label').containsText('Label');

    assert.verifySteps(['check']);
  });

  test('input yield only', async function (assert) {
    await render(
      hbs`<TpkRadio @onChange={{this.change}} @label="label" @selected="luc" @value="jean" @name="cule" as |O|>
        {{catch-state O}}
      </TpkRadio>`,
    );

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
      hbs`<TpkRadio @onChange={{this.change}} @label="label" @selected="luc" @value="jean" @name="cule" />`,
    );

    await a11yAudit();
    assert.expect(0);
  });
});
