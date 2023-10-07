/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import CatchState from 'dummy/tests/dummy/app/services/catch-state';

module('Integration | Component | tpk-file', function (hooks) {
  setupRenderingTest(hooks);

  test('class/less by default', async function (assert) {
    this.set('classless', false);
    await render(
      hbs`<TpkFile @classless={{this.classless}} @label="label" @value="value" as |F|>
        <F.Label />
        <F.Input />
</TpkFile>`,
    );

    assert.dom('.tpk-file-label').exists().containsText('label');
    assert.dom('.tpk-file').exists();

    this.set('classless', true);

    findAll('*')
      .filter((e) => e.id !== 'modal-overlays')
      .forEach((e) => {
        assert.dom(e).hasNoClass(/tpk-.*/);
      });
  });

  test('input yield only', async function (assert) {
    await render(
      hbs`<TpkFile @type="password" @onChange={{this.change}} @label="label" @value="value" as |O|>
        {{catch-state O}}
      </TpkFile>`,
    );

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
