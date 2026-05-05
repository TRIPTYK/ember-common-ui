import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { render, find } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkToggle from '@triptyk/ember-input/components/prefabs/tpk-toggle';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-toggle', () => {
  async function renderComponent({
    changeset,
    disabled,
  }: {
    changeset: ImmerChangeset;
    disabled?: boolean;
  }) {
    await render(
      <template>
        <TpkToggle @label="label" @disabled={{disabled}} @checked={{true}} />
      </template>,
    );
    return changeset;
  }

  renderingTest(
    'render toggle with default structure and with mandatory',
    async ({ env }) => {
      setupTest(env.owner);
      const changeset = new ImmerChangeset({
        toggle: 'applati',
      });
      await renderComponent({ changeset });
      expect(find('[data-test-tpk-label]')).toBeTruthy();
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    setupTest(env.owner);
    const changeset = new ImmerChangeset({
      toggle: 'applati',
    });
    await renderComponent({
      disabled: true,
      changeset,
    });
    expect(
      (
        find(
          '[data-test-tpk-prefab-toggle-container] input',
        ) as HTMLInputElement
      )?.disabled,
    ).toBe(true);
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    setupTest(env.owner);
    const changeset = new ImmerChangeset({
      toggle: 'applati',
    });
    await renderComponent({ changeset });
    await a11yAudit();
  });
});
