
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import CatchState from 'doc-app/services/catch-state';
import type { TestContext } from '@ember/test-helpers';
import catchState from 'doc-app/helpers/catch-state';
import TpkFile from '@triptyk/ember-input/components/tpk-file';

interface ThisTestContext extends TestContext {
  change: () => void;
}

module('Integration | Component | tpk-file', function (hooks) {
  setupRenderingTest(hooks);

  test('input yield only', async function (assert) {
    await render<ThisTestContext>(
      <template>
        <TpkFile @onChange={{this.change}} @label="label" as |O|>
          {{catchState O}}
        </TpkFile>
      </template>
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
    await render<ThisTestContext>(
      <template>
        <TpkFile @onChange={{this.change}} @label="label" />
      </template>
    );

    await a11yAudit();
    assert.expect(0);
  });
});
