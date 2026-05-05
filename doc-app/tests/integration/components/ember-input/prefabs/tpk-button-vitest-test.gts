import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, render, find } from '@ember/test-helpers';
import TpkPrefabButton from '@triptyk/ember-input/components/prefabs/tpk-prefab-button';
import { setupTest } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-button', () => {
  async function renderComponent(
    onClick: () => void,
    disabled: boolean = false,
  ) {
    await render(
      <template>
        <TpkPrefabButton
          @label="labelButton"
          @onClick={{onClick}}
          @disabled={{disabled}}
        />
      </template>,
    );
  }

  renderingTest('Render toggle with default structure', async ({ env }) => {
    setupTest(env.owner);
    const onClick = () => {};
    await renderComponent(onClick);
    expect(find('[data-test-tpk-prefab-button-container]')).toBeTruthy();
    expect(
      find('[data-test-tpk-prefab-button-container]')?.textContent?.trim(),
    ).toBe('labelButton');
  });

  renderingTest('Button is disabled', async ({ env }) => {
    setupTest(env.owner);
    const onClick = () => {};
    await renderComponent(onClick, true);
    expect(
      find('[data-test-tpk-prefab-button-container]')?.hasAttribute('disabled'),
    ).toBe(true);
  });

  renderingTest('onClick is called', async ({ env }) => {
    setupTest(env.owner);
    let message = 'before click';
    const onClick = () => {
      message = 'after click';
    };
    await renderComponent(onClick);
    expect(message).toBe('before click');
    await click('[data-test-tpk-prefab-button-container]');
    expect(message).toBe('after click');
  });
});
