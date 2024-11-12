import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { hbs } from 'ember-cli-htmlbars';
import { timeout } from 'ember-concurrency';

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
