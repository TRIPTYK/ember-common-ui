import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render } from '@ember/test-helpers';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'doc-app/services/catch-state';
import { fillIn } from '@ember/test-helpers';
import TpkTextarea from '@triptyk/ember-input/components/tpk-textarea';
import { setupTest } from '../../../test-helper';
import catchState from 'doc-app/helpers/catch-state';

describe('Integration | Component | tpk-area', () => {
  async function renderComponent() {
    await render(
      <template>
        <TpkTextarea @label="label" @value="value" as |O|>
          <O.Label />
          <O.Input />
          {{catchState O}}
        </TpkTextarea>
      </template>,
    );
  }

  renderingTest('input yield only', async ({ env }) => {
    setupTest(env.owner);
    await renderComponent();

    const service = (env.owner as ApplicationInstance).lookup(
      'service:catch-state',
    ) as CatchState;

    const state = service.state as { [key: string]: unknown };

    expect(typeof state['Input']).toBe('object');
    expect(typeof state['onChange']).toBe('function');
    expect(typeof state['Label']).toBe('object');
    expect(typeof state['changeEvent']).toBe('string');
    expect(typeof state['guid']).toBe('string');
    expect(typeof state['maxLength']).toBe('undefined');
  });

  renderingTest(
    'charcount updates when input value change',
    async ({ env }) => {
      setupTest(env.owner);
      await renderComponent();
      const stateService = (env.owner as ApplicationInstance).lookup(
        'service:catch-state',
      ) as CatchState;

      expect(
        (stateService.state as Record<'charCount', number>).charCount,
      ).toBe(5);
      await fillIn('textarea', 'test');
      expect(
        (stateService.state as Record<'charCount', number>).charCount,
      ).toBe(4);
    },
  );
});
