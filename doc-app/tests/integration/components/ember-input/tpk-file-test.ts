/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import CatchState from 'doc-app/services/catch-state';

module('Integration | Component | tpk-file', function (hooks) {
  setupRenderingTest(hooks);

  test('input yield only', async function (assert) {
    await render(
      hbs`<TpkFile @type="password" @onChange={{this.change}} @label="label" @value="value" as |O|>
        {{catch-state O}}
      </TpkFile>`,
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { state }: { state: any } = (
      getOwner(this) as ApplicationInstance
    ).lookup('service:catch-state') as CatchState;

    assert.strictEqual(typeof state.onChange, 'function');
    assert.strictEqual(typeof state.Input, 'object');
    assert.strictEqual(typeof state.Label, 'object');
    assert.strictEqual(typeof state.changeEvent, 'string');
    assert.strictEqual(typeof state.guid, 'string');
    assert.true(Array.isArray(state.files));
  });

  test('Accessibility', async function (assert) {
    await render(
      hbs`<TpkFile @type="password" @onChange={{this.change}} @label="label" @value="value"/>`,
    );

    await a11yAudit();
    assert.expect(0);
  });
});
