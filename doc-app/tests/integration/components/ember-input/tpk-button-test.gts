import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { rawTimeout, timeout } from 'ember-concurrency';

import TpkButton from '@triptyk/ember-input/components/tpk-button';

module('Integration | Component | tpk-button', function (hooks) {
  setupRenderingTest(hooks);

  async function spamClickElement() {
    await click('[data-test-tpk-button]');
    await click('[data-test-tpk-button]');
    await click('[data-test-tpk-button]');
    await click('[data-test-tpk-button]');
  }

  async function renderComponent(assert: Assert, allowSpam: boolean) {
    const onClick = async () => {
      await rawTimeout(100);
      assert.step('onClick');
    };

    await render(
      <template>
        <TpkButton
          @label="Click me"
          @onClick={{onClick}}
          @allowSpam={{allowSpam}}
        >
          Click me
        </TpkButton>
      </template>
    );

    await spamClickElement();
  }

  test('it prevents spam click by default', async function (assert) {
    await renderComponent(assert, false);
    await timeout(200);
    assert.verifySteps(['onClick']);
  });

  test('if @allowSpam is true, it does not prevent spamClick', async function (assert) {
    await renderComponent(assert, true);
    await timeout(500);
    assert.verifySteps(['onClick', 'onClick', 'onClick', 'onClick']);
  });
});
