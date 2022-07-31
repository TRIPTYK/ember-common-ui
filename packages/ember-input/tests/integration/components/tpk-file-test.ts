/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'dummy/tests/dummy/app/services/catch-state';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | tpk-file', function (hooks) {
  setupRenderingTest(hooks);

  test('class/less by default', async function (assert) {
    this.set('classless', false);
    await render(
      hbs`<TpkFile @classless={{this.classless}} @label="label" @value="value"/>`
    );

    assert.dom('.tpk-file-label').exists().containsText('label');
    assert.dom('.tpk-file').exists();

    this.set('classless', true);

    findAll('*').forEach((e) => {
      assert.dom(e).hasNoClass(/tpk-.*/);
    });
  });

  test('input by default', async function (assert) {
    this.set('change', function (e: File[]) {
      assert.step('step');
      assert.true(Array.isArray(e));
      assert.true(e[0] instanceof File);
    });

    await render(hbs`<TpkFile @onChange={{this.change}} @label="label"/>`);

    await triggerEvent('[data-test-tpk-file-input]', 'change', {
      files: [new File(['Ember Rules!'], 'err.txt')],
    });
    assert.dom("[data-test-tpk-file-input][type='file']").exists();
    assert.dom('[data-test-tpk-file-input]').hasAttribute('id', { any: true });
    assert.dom('[data-test-tpk-file-label]').hasAttribute('for', { any: true });
    assert.verifySteps(['step']);
  });

  test('input yield only', async function (assert) {
    await render(
      hbs`<TpkFile @type="password" @onChange={{this.change}} @label="label" @value="value" as |O|>
        {{catch-state O}}
      </TpkFile>`
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
      hbs`<TpkFile @type="password" @onChange={{this.change}} @label="label" @value="value"/>`
    );

    await a11yAudit(this.element);
    assert.expect(0);
  });
});
