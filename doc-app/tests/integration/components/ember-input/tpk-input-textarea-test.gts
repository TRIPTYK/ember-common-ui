
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, type TestContext } from '@ember/test-helpers';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'doc-app/services/catch-state';
import { fillIn } from '@ember/test-helpers';
import TpkTextarea from '@triptyk/ember-input/components/tpk-textarea';
import catchState from 'doc-app/helpers/catch-state';

interface ThisTestContext extends TestContext {
}

module('Integration | Component | tpk-area', function (hooks) {
  setupRenderingTest(hooks);

  async function renderComponent() {
    await render<ThisTestContext>(
      <template>
        <TpkTextarea @label="label" @value="value" as |O|>
          <O.Label />
          <O.Input />
          {{catchState O}}
        </TpkTextarea>
      </template>
    );
  }

  test<ThisTestContext>('input yield only', async function (assert) {
    await renderComponent();

    const service = (getOwner(this) as ApplicationInstance).lookup(
      'service:catch-state',
    ) as CatchState;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = service.state as any;

    assert.strictEqual(typeof state.Input, 'object');
    assert.strictEqual(typeof state.onChange, 'function');
    assert.strictEqual(typeof state.Label, 'object');
    assert.strictEqual(typeof state.changeEvent, 'string');
    assert.strictEqual(typeof state.guid, 'string');
    assert.strictEqual(typeof state.maxLength, 'undefined');
  });

  test<ThisTestContext>('charcount updates when input value change', async function (assert) {
    await renderComponent();
    const stateService = (getOwner(this) as ApplicationInstance).lookup(
      'service:catch-state',
    ) as CatchState;

    assert.strictEqual(
      (stateService.state as Record<'charCount', number>).charCount,
      5,
    );
    await fillIn('textarea', 'test');
    assert.strictEqual(
      (stateService.state as Record<'charCount', number>).charCount,
      4,
    );
  });
});
