import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render } from '@ember/test-helpers';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'doc-app/services/catch-state';
import catchState from 'doc-app/helpers/catch-state';
import TpkFile from '@triptyk/ember-input/components/tpk-file';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | tpk-file', () => {
  renderingTest('input yield only', async ({ env }) => {
    setupTest(env.owner);
    await render(
      <template>
        <TpkFile @label="label" as |O|>
          {{catchState O}}
        </TpkFile>
      </template>,
    );

    const { state } = (env.owner as ApplicationInstance).lookup(
      'service:catch-state',
    ) as CatchState<Record<string, unknown>>;

    expect(typeof state?.onChange).toBe('function');
    expect(typeof state?.Input).toBe('object');
    expect(typeof state?.Label).toBe('object');
    expect(typeof state?.changeEvent).toBe('string');
    expect(typeof state?.guid).toBe('string');
    expect(Array.isArray(state?.files)).toBe(true);
  });
});
