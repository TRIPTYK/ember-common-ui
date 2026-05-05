import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationEmail from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-email';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest, type VitestTestEnv } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-email', () => {
  function setupChangeset(email: string) {
    return new ImmerChangeset({ email });
  }

  async function renderComponent(
    { env }: { env: VitestTestEnv },
    { changeset, disabled }: { changeset: ImmerChangeset; disabled?: boolean },
  ) {
    setupTest(env.owner);

    await render(
      <template>
        <TpkValidationEmail
          @changeset={{changeset}}
          @validationField="email"
          @disabled={{disabled}}
          @label="Email validation field"
        />
      </template>,
    );
  }

  renderingTest('the type of the input is email', async ({ env }) => {
    const changeset = setupChangeset('email');
    await renderComponent({ env }, { changeset });
    expect(find('input')?.getAttribute('type')).toBe('email');
  });

  renderingTest(
    'It changes data-has-error attribute on error',
    async ({ env }) => {
      const changeset = setupChangeset('');
      await renderComponent({ env }, { changeset });
      await assertDataHasErrorAttribute(changeset, 'email');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      const changeset = setupChangeset('email');
      await renderComponent({ env }, { changeset });
      assertTpkCssClassesExist('email');
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    await renderComponent(
      { env },
      { changeset: setupChangeset(''), disabled: true },
    );
    expect(find('[data-test-tpk-email-input]')?.hasAttribute('disabled')).toBe(
      true,
    );
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    await renderComponent(
      { env },
      { changeset: setupChangeset(''), disabled: false },
    );
    await a11yAudit();
  });
});
