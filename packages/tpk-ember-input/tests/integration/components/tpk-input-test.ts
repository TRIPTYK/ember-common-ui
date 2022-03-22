/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'dummy/tests/dummy/app/services/catch-state';

module('Integration | Component | tpk-input', function (hooks) {
  setupRenderingTest(hooks);

  test('class/less by default', async function (assert) {
    this.set('classless', false);
    await render(
      hbs`<TpkInput @classless={{this.classless}} @label="label" @value="value"/>`
    );

    assert.dom('.tpk-input-label').exists().containsText('label');
    assert.dom('.tpk-input-input').exists().hasValue('value');
    assert.dom('.tpk-input').exists();

    this.set('classless', true);

    assert.dom('.tpk-input-label').doesNotExist();
    assert.dom('.tpk-input-input').doesNotExist();
    assert.dom('.tpk-input').doesNotExist();
  });

  test('input by default', async function (assert) {
    this.set('change', function (e: string) {
      assert.step('step');
      assert.strictEqual(e, 'data');
    });

    await render(
      hbs`<TpkInput @type="password" @onChange={{this.change}} @label="label" @value="value"/>`
    );

    await fillIn('[data-test-tpk-input-input]', 'data');
    assert.dom("[data-test-tpk-input-input][type='password']").exists();
    assert.dom("[data-test-tpk-input-input][type='text']").doesNotExist();
    assert.dom('[data-test-tpk-input-input]').hasAttribute('id', { any: true });
    assert
      .dom('[data-test-tpk-input-label]')
      .hasAttribute('for', { any: true });
    assert.verifySteps(['step']);
  });

  test('input yield only', async function (assert) {
    await render(
      hbs`<TpkInput @type="password" @onChange={{this.change}} @label="label" @value="value" as |O|>
        {{catch-state O}}
      </TpkInput>`
    );

    const { state }: { state: any } = (
      getOwner(this) as ApplicationInstance
    ).lookup('service:catch-state') as CatchState;

    assert.strictEqual(typeof state.Input, 'object');
    assert.strictEqual(typeof state.Label, 'object');
    assert.strictEqual(typeof state.guid, 'string');
  });
});
