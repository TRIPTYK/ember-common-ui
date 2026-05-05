import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, render, setupOnerror } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationRadioGroup from '@triptyk/ember-input-validation/components/tpk-validation-radio-group';
import { find } from '@ember/test-helpers';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | tpk-validation-radio-group', () => {
  async function setupComponent(value?: string | boolean) {
    const changeset = new ImmerChangeset({
      radio: value,
    });

    await render(
      <template>
        <TpkValidationRadioGroup
          @mandatory={{true}}
          @changeset={{changeset}}
          @validationField="radio"
          as |R|
        >
          <R.Radio @value="good" @label="good" as |T|>
            <T.Input data-test-radio="good" />
            <T.Label />
          </R.Radio>
          <R.Radio @value="bad" @label="bad" as |T|>
            <T.Input data-test-radio="bad" />
            <T.Label />
          </R.Radio>
        </TpkValidationRadioGroup>
      </template>,
    );
    return changeset;
  }

  renderingTest('render radio with default structure', async ({ env }) => {
    setupTest(env.owner);
    const changeset = await setupComponent(undefined);
    expect(changeset.get('radio')).toBe(undefined);
    await click("[data-test-radio='bad']");

    expect((find("[data-test-radio='bad']") as HTMLInputElement)?.checked).toBe(
      true,
    );
    expect(changeset.get('radio')).toBe('bad');
    await click("[data-test-radio='good']");
    expect(
      (find("[data-test-radio='good']") as HTMLInputElement)?.checked,
    ).toBe(true);
    expect((find("[data-test-radio='bad']") as HTMLInputElement)?.checked).toBe(
      false,
    );
    expect(changeset.get('radio')).toBe('good');
  });

  renderingTest(
    'changeset set value selected the good radio',
    async ({ env }) => {
      setupTest(env.owner);
      await setupComponent('good');
      expect(
        (find("[data-test-radio='good']") as HTMLInputElement)?.checked,
      ).toBe(true);
    },
  );

  renderingTest('must set wrong value type to selected', async ({ env }) => {
    setupTest(env.owner);
    setupOnerror(function (err: Error) {
      expect(err.message).toBe(
        'Assertion Failed: The changeset value must be a string',
      );
    });
    await setupComponent(true);
  });
});
