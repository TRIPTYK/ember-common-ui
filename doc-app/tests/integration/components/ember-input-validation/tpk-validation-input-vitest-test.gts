import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { fillIn, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationInput from '@triptyk/ember-input-validation/components/tpk-validation-input';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | tpk-validation-input', () => {
  function setupChangeset() {
    return new ImmerChangeset({
      name: 'value',
    });
  }

  renderingTest('It overrides change function', async ({ env }) => {
    setupTest(env.owner);

    const changeset = setupChangeset();
    const onChange = vi.fn();

    await render(
      <template>
        <TpkValidationInput
          @type="text"
          @label="label"
          @onChange={{onChange}}
          @changeset={{changeset}}
          @validationField="name"
          as |I|
        >
          <I.Label /><I.Input /></TpkValidationInput>
      </template>,
    );

    await fillIn('input', 'blah');
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('blah', expect.anything());
  });

  renderingTest('override change function', async ({ env }) => {
    setupTest(env.owner);

    const changeset = setupChangeset();
    const onChange = vi.fn();

    await render(
      <template>
        <TpkValidationInput
          @label="Mot de passe"
          @placeholder="mot de passe"
          @onChange={{onChange}}
          @changeset={{changeset}}
          @validationField="name"
          as |I|
        ><I.Label /><I.Input /></TpkValidationInput>
      </template>,
    );

    await fillIn('input', 'valueChanged');
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('valueChanged', expect.anything());
  });

  renderingTest(
    'changeset change when element is modified',
    async ({ env }) => {
      setupTest(env.owner);

      const changeset = setupChangeset();

      await render(
        <template>
          <TpkValidationInput
            @label="Mot de passe"
            @placeholder="mot de passe"
            @changeset={{changeset}}
            @validationField="name"
            as |TI|
          >
            <TI.Label>
              Mot de passe
            </TI.Label>
            <TI.Input />
          </TpkValidationInput>
        </template>,
      );

      await fillIn('input', 'valueChanged');
      expect(changeset.get('name')).toBe('valueChanged');
    },
  );
});
