import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { fillIn, render, find } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationTextarea from '@triptyk/ember-input-validation/components/tpk-validation-textarea';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | tpk-validation-textarea', () => {
  renderingTest('it works with default syntax', async ({ env }) => {
    setupTest(env.owner);
    const immerChangeset = new ImmerChangeset({
      name: 'a',
    });

    await render(
      <template>
        <TpkValidationTextarea
          @label="label"
          @changeset={{immerChangeset}}
          @validationField="name"
          as |T|
        >
          <T.Input />
          <T.Label />
        </TpkValidationTextarea>
      </template>,
    );
    expect(find('textarea')).toBeTruthy();
    expect(find('[data-test-tpk-label]')?.textContent).toContain('label');
    expect(
      (find('[data-test-tpk-textarea-input]') as HTMLInputElement)?.value,
    ).toBe('a');

    await fillIn('[data-test-tpk-textarea-input]', '');
    expect(immerChangeset.get('name')).toBe('');
  });
});
