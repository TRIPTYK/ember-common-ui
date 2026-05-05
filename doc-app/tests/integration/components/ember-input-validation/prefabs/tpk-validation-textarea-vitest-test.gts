import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationTextarea from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-textarea';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-textarea', () => {
  async function renderComponent(
    { env }: { env: VitestTestEnv },
    params?: { disabled?: boolean },
  ) {
    setupTest(env.owner);

    const changeset = new ImmerChangeset({ name: 'Hellooo' });

    await render(
      <template>
        <TpkValidationTextarea
          @changeset={{changeset}}
          @validationField="name"
          @disabled={{params.disabled}}
          @label="label"
          @mandatory={{true}}
        />
      </template>,
    );

    return changeset;
  }

  renderingTest(
    'renders checkbox with default structure and with mandatory',
    async ({ env }) => {
      await renderComponent({ env });
      expect(find('[data-test-tpk-label]')).toBeTruthy();
      expect(find('[data-test-tpk-textarea-input]')).toBeTruthy();
      expect(
        find('[data-test-tpk-label]')?.textContent?.trim().replace(/\s+/g, ' '),
      ).toContain('label *');
      expect(
        (find('[data-test-tpk-textarea-input]') as HTMLTextAreaElement)?.value,
      ).toBe('Hellooo');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      await renderComponent({ env });
      assertTpkCssClassesExist('textarea', 'textarea');
    },
  );

  renderingTest('@disabled disables the textarea', async ({ env }) => {
    await renderComponent({ env }, { disabled: true });
    expect(
      find('[data-test-tpk-textarea-input]')?.hasAttribute('disabled'),
    ).toBe(true);
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    await renderComponent({ env });
    await a11yAudit();
  });
});
