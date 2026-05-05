import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, render, find } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationRadio from '@triptyk/ember-input-validation/components/tpk-validation-radio';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | tpk-validation-radio', () => {
  async function setupComponent() {
    const values = ['good', 'bad', 'ugly'];
    const changeset = new ImmerChangeset({
      radio: undefined,
    });
    const good = values[0] as string;
    const bad = values[1] as string;

    await render(
      <template>
        <TpkValidationRadio
          @changeset={{changeset}}
          @validationField="radio"
          @value={{good}}
          @label="good"
          as |T|
        >
          <T.Input data-test-radio="good" />
          <T.Label />
        </TpkValidationRadio>
        <TpkValidationRadio
          @changeset={{changeset}}
          @validationField="radio"
          @value={{bad}}
          @label="bad"
          as |T|
        >
          <T.Input data-test-radio="bad" />
          <T.Label />
        </TpkValidationRadio>
      </template>,
    );
    return changeset;
  }

  renderingTest('render radio with default structure', async ({ env }) => {
    setupTest(env.owner);
    await setupComponent();
    expect(find('[data-test-tpk-label]')).toBeTruthy();
    expect(find('[data-test-tpk-radio-input]')).toBeTruthy();
  });

  renderingTest('It changes data on click radio', async ({ env }) => {
    setupTest(env.owner);
    const changeset = await setupComponent();
    expect(changeset.get('radio')).toBe(undefined);
    expect(
      (find("[data-test-radio='good']") as HTMLInputElement)?.checked,
    ).toBe(false);

    await click("[data-test-radio='good']");

    expect(
      (find("[data-test-radio='good']") as HTMLInputElement)?.checked,
    ).toBe(true);
    expect((find("[data-test-radio='bad']") as HTMLInputElement)?.checked).toBe(
      false,
    );
    expect(changeset.get('radio')).toBe('good');

    await click("[data-test-radio='bad']");

    expect((find("[data-test-radio='bad']") as HTMLInputElement)?.checked).toBe(
      true,
    );
    expect(changeset.get('radio')).toBe('bad');
  });
});
