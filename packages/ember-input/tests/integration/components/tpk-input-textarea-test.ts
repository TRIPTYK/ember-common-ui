/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'dummy/tests/dummy/app/services/catch-state';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | tpk-area', function (hooks) {
  setupRenderingTest(hooks);

  test('input yield only', async function (assert) {
    await render(
      hbs`<TpkTextarea @onChange={{this.change}} @label="label" @value="value" as |O|>
        {{catch-state O}}
      </TpkTextarea>`
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
      hbs`<TpkTextarea @onChange={{this.change}} @label="label" @value="value"/>`
    );

    await a11yAudit(this.element);
    assert.expect(0);
  });
});
