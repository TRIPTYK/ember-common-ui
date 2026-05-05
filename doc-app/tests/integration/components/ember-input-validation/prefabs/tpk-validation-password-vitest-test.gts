import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, find, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationPassword from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-password';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-password', () => {
  async function renderComponent(
    { env }: { env: VitestTestEnv },
    { disabled = false }: { disabled?: boolean },
  ) {
    setupTest(env.owner);

    const changeset = new ImmerChangeset({ name: 'value' });

    await render(
      <template>
        <TpkValidationPassword
          class="custom-class"
          @label="test"
          @disabled={{disabled}}
          @changeset={{changeset}}
          @validationField="name"
        />
      </template>,
    );

    return changeset;
  }

  renderingTest(
    'Should have a toggle button when @disabled=false',
    async ({ env }) => {
      await renderComponent({ env }, { disabled: false });
      expect(
        find('[data-test-tpk-password-toggle-button]')?.classList.contains(
          'tpk-password-toggle-button',
        ),
      ).toBe(true);
    },
  );

  renderingTest(
    'Should not have a toggle button when @disabled=true',
    async ({ env }) => {
      await renderComponent({ env }, { disabled: true });
      expect(find('[data-test-tpk-password-toggle-button]')).toBeNull();
    },
  );

  renderingTest('Should have an eye image', async ({ env }) => {
    await renderComponent({ env }, { disabled: false });
    expect(find('[data-test-tpk-password-toggle-icon-eye-shut]')).toBeTruthy();
  });

  renderingTest('Input type should be password', async ({ env }) => {
    await renderComponent({ env }, { disabled: false });
    expect(find('input')?.getAttribute('type')).toBe('password');
  });

  renderingTest(
    'When button is clicked, input type should be text',
    async ({ env }) => {
      await renderComponent({ env }, { disabled: false });
      await click('[data-test-tpk-password-toggle-button]');
      expect(find('input')?.getAttribute('type')).toBe('text');
    },
  );

  renderingTest(
    'When button is clicked, eye icon should be eye-shut',
    async ({ env }) => {
      await renderComponent({ env }, { disabled: false });
      await click('[data-test-tpk-password-toggle-button]');
      expect(find('[data-test-tpk-password-toggle-icon-eye]')).toBeTruthy();
      expect(find('[data-test-tpk-password-toggle-icon-eye-shut]')).toBeNull();
    },
  );

  renderingTest(
    'When button is clicked twice, input type should be password',
    async ({ env }) => {
      await renderComponent({ env }, { disabled: false });
      await click('[data-test-tpk-password-toggle-button]');
      await click('[data-test-tpk-password-toggle-button]');
      expect(find('input')?.getAttribute('type')).toBe('password');
    },
  );

  renderingTest(
    'Attributes should be passed to the container',
    async ({ env }) => {
      await renderComponent({ env }, { disabled: false });
      expect(
        find('[data-test-tpk-prefab-password-container]')?.classList.contains(
          'custom-class',
        ),
      ).toBe(true);
    },
  );

  renderingTest(
    'Error prefab appears if an error is added to changeset',
    async ({ env }) => {
      const changeset = await renderComponent({ env }, { disabled: false });
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'name',
      });
      expect(find('.tpk-validation-errors')).toBeTruthy();
      await settled();
      expect(find('.tpk-validation-errors span')?.textContent?.trim()).toBe(
        'required',
      );
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    await renderComponent({ env }, { disabled: true });
    expect(
      find('[data-test-tpk-password-input]')?.hasAttribute('disabled'),
    ).toBe(true);
  });

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      await renderComponent({ env }, { disabled: false });
      assertTpkCssClassesExist('password');
    },
  );

  renderingTest.skip('Accessibility', async ({ env }) => {
    await renderComponent({ env }, { disabled: false });
    await a11yAudit();
  });
});
