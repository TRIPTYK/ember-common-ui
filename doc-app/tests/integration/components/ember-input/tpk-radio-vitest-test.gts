import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render, find } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import ApplicationInstance from '@ember/application/instance';
import TpkRadio from '@triptyk/ember-input/components/tpk-radio';
import { setupTest } from '../../../test-helper';
import catchState from 'doc-app/helpers/catch-state';

describe('Integration | Component | ui/radio', () => {
  renderingTest('it renders complex', async ({ env }) => {
    setupTest(env.owner);
    const setRadio = vi.fn();

    await render(
      <template>
        <TpkRadio
          @label="Label"
          @selected="luc"
          @value="jean"
          @name="cule"
          @onChange={{setRadio}}
          as |C|
        >
          <C.Input class="text-yellow-300" />
          <C.Label class="text-blue-300" />
        </TpkRadio>
      </template>,
    );

    await click('label');
    expect(find('input.text-yellow-300')).toBeTruthy();
    expect(find('label.text-blue-300')).toBeTruthy();

    expect(find('label')?.textContent).toContain('Label');

    expect(setRadio).toHaveBeenCalledOnce();
    const [selected, e] = setRadio.mock.calls[0] as [string, Event];
    expect(typeof selected).toBe('string');
    expect(e instanceof Event).toBe(true);
    expect(selected).toBe('jean');
  });

  renderingTest('input yield only', async ({ env }) => {
    setupTest(env.owner);
    await render(
      <template>
        <TpkRadio
          @label="label"
          @selected="luc"
          @value="jean"
          @name="cule"
          as |O|
        >
          {{catchState O}}
        </TpkRadio>
      </template>,
    );

    const { state } = (env.owner as ApplicationInstance).lookup(
      'service:catch-state',
    ) as { state: Record<string, unknown> };

    expect(typeof state['Input']).toBe('object');
    expect(typeof state['onChange']).toBe('function');
    expect(typeof state['Label']).toBe('object');
    expect(typeof state['changeEvent']).toBe('string');
    expect(typeof state['guid']).toBe('string');
  });
});
