/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import CatchState from 'dummy/tests/dummy/app/services/catch-state';
import { timeout } from 'ember-concurrency';
import { settled } from '@ember/test-helpers';

module('Integration | Component | tpk-button', function (hooks) {
  setupRenderingTest(hooks);

  async function spamClickElement() {
    click('[data-test-tpk-button]');
    click('[data-test-tpk-button]');
    click('[data-test-tpk-button]');
    await click('[data-test-tpk-button]');
  }

  test('it prevents spam click by default', async function (assert) {
    this.set('onClick', async () => {
      await timeout(1000);
      assert.step('onClick');
    });

    await render(hbs`
      <TpkButton
        @onClick={{this.onClick}}
      >
        Click me
      </TpkButton>
    `);

    await spamClickElement();

    assert.verifySteps(['onClick']);
  });

  test('if @allowSpam is true, it does not prevent spamClick', async function (assert) {
    this.set('onClick', async () => {
      await timeout(1000);
      assert.step('onClick');
    });

    await render(hbs`
      <TpkButton
        @onClick={{this.onClick}}
        @allowSpam={{true}}
      >
        Click me
      </TpkButton>
    `);

    await spamClickElement();

    assert.verifySteps(['onClick', 'onClick', 'onClick', 'onClick']);
  });
});
