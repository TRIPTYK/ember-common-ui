/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import CatchState from 'dummy/tests/dummy/app/services/catch-state';
import { fillIn } from '@ember/test-helpers';

module('Integration | Component | tpk-area', function (hooks) {
  setupRenderingTest(hooks);

  async function renderComponent() {
    await render(
      hbs`<TpkTextarea @onChange={{this.change}} @label="label" @value="value" as |O|>
        <O.Input />
        {{catch-state O}}
      </TpkTextarea>`,
    );
  }

  test('input yield only', async function (assert) {
    await renderComponent();

    const { state }: { state: any } = (
      getOwner(this) as ApplicationInstance
    ).lookup('service:catch-state') as CatchState;

    assert.strictEqual(typeof state.Input, 'object');
    assert.strictEqual(typeof state.onChange, 'function');
    assert.strictEqual(typeof state.Label, 'object');
    assert.strictEqual(typeof state.changeEvent, 'string');
    assert.strictEqual(typeof state.guid, 'string');
    assert.strictEqual(typeof state.maxLength, 'undefined');
  });

  test('charcount updates when input value change', async function (assert) {
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

  test('Accessibility', async function (assert) {
    await render(
      hbs`<TpkTextarea @onChange={{this.change}} @label="label" @value="value"/>`,
    );
    await a11yAudit();
    assert.expect(0);
  });
});
