import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render, fillIn, find } from '@ember/test-helpers';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'doc-app/services/catch-state';

import catchState from 'doc-app/helpers/catch-state';
import TpkInput from '@triptyk/ember-input/components/tpk-input';
import { setupTest } from 'doc-app/tests/test-helper';

describe('Integration | Component | tpk-input', () => {
  renderingTest('input yield only', async ({ env }) => {
    setupTest(env.owner);
    await render(
      <template>
        <TpkInput @type="password" @label="label" @value="value" as |O|>
          {{catchState O}}
        </TpkInput>
      </template>,
    );

    const { state } = (env.owner as ApplicationInstance).lookup(
      'service:catch-state',
    ) as CatchState<Record<string, unknown>>;

    expect(typeof state?.['Input']).toBe('object');
    expect(typeof state?.['changeEvent']).toBe('string');
    expect(typeof state?.['Label']).toBe('object');
    expect(typeof state?.['guid']).toBe('string');
  });

  renderingTest('input with mask return masked value', async () => {
    const maskPrefix = 'MLP';
    const maskContent = '0000';
    const valueToApply = '1234';

    const mask = `${maskPrefix}${maskContent}`;
    const change = vi.fn();
    await render(
      <template>
        <TpkInput
          @type="text"
          @onChange={{change}}
          @label="label"
          @value="value"
          @mask={{mask}}
          as |I|
        >
          <I.Input />
          <I.Label />
        </TpkInput>
      </template>,
    );

    await fillIn('[data-test-tpk-input-input]', valueToApply);
    expect(change).toHaveBeenCalledOnce();
    expect(change).toHaveBeenCalledWith(
      `${maskPrefix}${valueToApply}`,
      expect.anything(),
    );
  });

  renderingTest('input with mask return unmasked value', async () => {
    const maskPrefix = 'MLP';
    const maskContent = '0000';
    const valueToApply = '1234';

    const mask = `${maskPrefix}${maskContent}`;
    const change = vi.fn();
    await render(
      <template>
        <TpkInput
          @type="text"
          @onChange={{change}}
          @label="label"
          @value="value"
          @mask={{mask}}
          @unmaskValue={{true}}
          as |I|
        >
          <I.Input />
          <I.Label />
        </TpkInput>
      </template>,
    );

    await fillIn('[data-test-tpk-input-input]', valueToApply);
    expect(change).toHaveBeenCalledOnce();
    expect(change).toHaveBeenCalledWith(`${valueToApply}`, expect.anything());
  });

  renderingTest('input apply maskOptions', async () => {
    const maskPrefix = 'MLP';
    const maskContent = '0000';
    const maskOptions = {
      lazy: false,
      placeholderChar: '#',
    };
    const mask = `${maskPrefix}${maskContent}`;
    const change = () => {};
    await render(
      <template>
        <TpkInput
          @type="text"
          @onChange={{change}}
          @label="label"
          @value="value"
          @mask={{mask}}
          @maskOptions={{maskOptions}}
          @unmaskValue={{true}}
          as |I|
        >
          <I.Input />
          <I.Label />
        </TpkInput>
      </template>,
    );
    expect(
      (find('[data-test-tpk-input-input]') as HTMLInputElement)?.value,
    ).toBe(`${maskPrefix}####`);
  });

  renderingTest(
    'when input type=number, onChange value should be a number',
    async () => {
      const change = vi.fn();
      await render(
        <template>
          <TpkInput
            @type="number"
            @onChange={{change}}
            @label="label"
            @value={{123}}
            as |I|
          >
            <I.Input />
            <I.Label />
          </TpkInput>
        </template>,
      );

      await fillIn('[data-test-tpk-input-input]', '123');
      expect(change).toHaveBeenCalledOnce();
      expect(change).toHaveBeenCalledWith(123, expect.anything());
    },
  );
});
