import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import { click, render } from '@ember/test-helpers';
import TpkPrefabButton from '@triptyk/ember-input/components/prefabs/tpk-prefab-button';

module(
  'Integration | Component | Prefabs | tpk-button',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    let message = "before click"
    
    async function renderComponent(onClick: () => void, disabled: boolean = false) {
      await render( <template>
        <TpkPrefabButton 
          @label="labelButton"
          @onClick={{onClick}}
          @disabled={{disabled}}
          />
      </template>)
    }
    const onClick=()=> {
      message = "after click"
    }

    test('Render toggle with default structure', async function (assert) {
      
      await renderComponent(onClick);
      assert.dom('[data-test-tpk-prefab-button-container]').exists();
      assert.dom('[data-test-tpk-prefab-button-container]').hasText('labelButton');
    });

    test('Button is disabled', async function (assert) {
      await renderComponent(onClick, true);
      assert.dom('[data-test-tpk-prefab-button-container]').hasAttribute('disabled');
      
    });

    test('onClick is called', async function (assert) {
      await renderComponent(onClick);
      assert.strictEqual(message, "before click");
      await click('[data-test-tpk-prefab-button-container]');
      assert.strictEqual(message, "after click");
    });
  }
)