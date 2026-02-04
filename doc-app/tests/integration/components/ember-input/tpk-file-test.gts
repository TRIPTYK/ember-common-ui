import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { getOwner } from '@ember/owner';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'doc-app/services/catch-state';
import catchState from 'doc-app/helpers/catch-state';
import TpkFile from '@triptyk/ember-input/components/tpk-file';

module('Integration | Component | tpk-file', function (hooks) {
  setupRenderingTest(hooks);

  test('input yield only', async function (assert) {
    await render(
      <template>
        <TpkFile @label="label" as |O|>
          {{catchState O}}
        </TpkFile>
      </template>
    );

    const { state } = (getOwner(this) as ApplicationInstance).lookup(
      'service:catch-state'
    ) as CatchState<Record<string, unknown>>;

    assert.strictEqual(typeof state?.onChange, 'function');
    assert.strictEqual(typeof state?.Input, 'object');
    assert.strictEqual(typeof state?.Label, 'object');
    assert.strictEqual(typeof state?.changeEvent, 'string');
    assert.strictEqual(typeof state?.guid, 'string');
    assert.true(Array.isArray(state?.files));
  });
});
