import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render, find } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'doc-app/services/catch-state';
import TpkCheckbox from '@triptyk/ember-input/components/tpk-checkbox';
import catchState from 'doc-app/helpers/catch-state';
import { setupTest } from 'doc-app/tests/test-helper';

describe('Integration | Component | ui/checkbox', () => {
  renderingTest('it renders complex', async () => {
    const setChecked = vi.fn();

    await render(
      <template>
        <TpkCheckbox
          @label="Label"
          @checked={{false}}
          @onChange={{setChecked}}
          as |C|
        >
          <C.Input class="text-yellow-300" />
          <C.Label class="text-blue-300" />
        </TpkCheckbox>
      </template>,
    );

    await click('label');
    expect(find('input.text-yellow-300')).toBeTruthy();
    expect(find('label.text-blue-300')).toBeTruthy();

    expect(find('label')?.textContent).toContain('Label');

    expect(setChecked).toHaveBeenCalledOnce();
    const [checked, value, e] = setChecked.mock.calls[0] as [
      boolean,
      string,
      Event,
    ];
    expect(typeof checked).toBe('boolean');
    expect(typeof value).toBe('string');
    expect(e instanceof Event).toBe(true);
    expect(checked).toBe(true);
  });

  renderingTest('input yield only', async ({ env }) => {
    setupTest(env.owner);
    await render(
      <template>
        <TpkCheckbox @label="label" @checked={{true}} as |O|>
          {{catchState O}}
        </TpkCheckbox>
      </template>,
    );

    const { state } = (env.owner as ApplicationInstance).lookup(
      'service:catch-state',
    ) as CatchState<Record<string, unknown>>;

    expect(typeof state?.Input).toBe('object');
    expect(typeof state?.onChange).toBe('function');
    expect(typeof state?.Label).toBe('object');
    expect(typeof state?.changeEvent).toBe('string');
    expect(typeof state?.guid).toBe('string');
  });
});
