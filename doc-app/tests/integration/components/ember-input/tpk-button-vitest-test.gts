import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { rawTimeout, timeout } from 'ember-concurrency';

import TpkButton from '@triptyk/ember-input/components/tpk-button';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | tpk-button', () => {
  async function spamClickElement() {
    await click('[data-test-tpk-button]');
    await click('[data-test-tpk-button]');
    await click('[data-test-tpk-button]');
    await click('[data-test-tpk-button]');
  }

  renderingTest('it prevents spam click by default', async ({ env }) => {
    setupTest(env.owner);
    const onClick = vi.fn(async () => {
      await rawTimeout(100);
    });

    await render(
      <template>
        <TpkButton @label="Click me" @onClick={{onClick}} @allowSpam={{false}}>
          Click me
        </TpkButton>
      </template>,
    );

    await spamClickElement();
    await timeout(200);
    expect(onClick).toHaveBeenCalledOnce();
  });

  renderingTest(
    'if @allowSpam is true, it does not prevent spamClick',
    async ({ env }) => {
      setupTest(env.owner);
      const onClick = vi.fn(async () => {
        await rawTimeout(100);
      });

      await render(
        <template>
          <TpkButton @label="Click me" @onClick={{onClick}} @allowSpam={{true}}>
            Click me
          </TpkButton>
        </template>,
      );

      await spamClickElement();
      await timeout(500);
      expect(onClick).toHaveBeenCalledTimes(4);
    },
  );
});
