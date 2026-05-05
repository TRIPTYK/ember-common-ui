import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { fillIn, find, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationInteger from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-integer';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-integer', () => {
  function setupChangeset() {
    return new ImmerChangeset({ integer: 0 });
  }

  async function renderComponent(
    env: VitestTestEnv,
    params: { changeset: ImmerChangeset; disabled?: boolean },
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationInteger
          @changeset={{params.changeset}}
          @validationField="integer"
          @label="Integer validation field"
          class="custom-integer-class"
          @disabled={{params.disabled}}
        />
      </template>,
    );
  }

  async function renderComponentUnsigned(
    env: VitestTestEnv,
    params: { changeset: ImmerChangeset },
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationInteger
          @changeset={{params.changeset}}
          @validationField="integer"
          @label="Integer validation field"
          class="custom-integer-class"
          @unsigned={{true}}
        />
      </template>,
    );
  }

  renderingTest('Input type must be a number', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent(env, { changeset });
    await fillIn('input', '2');
    expect(find('input')?.getAttribute('type')).toBe('number');
    expect(changeset.get('integer')).toBe(2);
    await fillIn('input', 'jacques');
    expect(changeset.get('integer')).toBeFalsy();
  });

  renderingTest('Input does not allow dot and comma', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent(env, { changeset });
    await fillIn('input', ',');
    expect(changeset.get('integer')).toBeFalsy();
    await fillIn('input', '.');
    expect(changeset.get('integer')).toBeFalsy();
    await fillIn('input', '2');
    expect(changeset.get('integer')).toBe(2);
  });

  renderingTest(
    'Attributes should be passed to the container',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent(env, { changeset });
      expect(
        find('[data-test-tpk-prefab-integer-container]')?.classList.contains(
          'custom-integer-class',
        ),
      ).toBe(true);
    },
  );

  renderingTest('it passes unsigned integer', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponentUnsigned(env, { changeset });
    await fillIn('input', '1');
    const input = find('input') as HTMLInputElement;
    expect(changeset.get('integer')).toBe(1);
    input?.stepDown();
    input?.stepDown();
    expect((find('input') as HTMLInputElement)?.value).toBe('0');
  });

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponentUnsigned(env, { changeset });
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'integer',
      });
      expect(find('.tpk-validation-errors')).toBeTruthy();
      await settled();
      await assertDataHasErrorAttribute(changeset, 'integer');
      expect(find('.tpk-validation-errors span')?.textContent?.trim()).toBe(
        'required',
      );
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      const changeset = setupChangeset();
      await renderComponent(env, { changeset });
      assertTpkCssClassesExist('integer');
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent(env, { disabled: true, changeset });
    expect(
      find('[data-test-tpk-integer-input]')?.hasAttribute('disabled'),
    ).toBe(true);
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    const changeset = setupChangeset();
    await renderComponent(env, { disabled: false, changeset });
    await a11yAudit();
  });
});
