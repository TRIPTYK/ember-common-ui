import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import { render } from '@ember/test-helpers';
import TpkConfirmModalPrefab from '@triptyk/ember-ui/components/prefabs/tpk-confirm-modal-prefab';
import { confirmModalObject } from 'doc-app/tests/pages/ember-confirm-modal';

module('Integration | Component | Prefabs | Tpk-confirm-modal-prefab', function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');

  async function renderComponent( assert: Assert, isOpen = true) {

    const onClose = function () {
      assert.step('onClose');
    };
    const onConfirm = function () {
      assert.step('onConfirm');
    };
    const confirmQuestion = 'Do you confirm ? :smirk:';
    await render(
      <template>
        <div id="tpk-modal">
          <TpkConfirmModalPrefab
            @onClose={{onClose}}
            @onConfirm={{onConfirm}}
            @cancelText="Annuler"
            @confirmText="Confirmer"
            @confirmQuestion={{confirmQuestion}}
            @isOpen={{isOpen}}
          />
        </div>
      </template>
    );
  }

  test('Render prefab confirm modal', async function(assert) {
    await renderComponent(assert)
    assert.dom('[data-test-confirm-modal-container]').exists();
  });

  test('@onClose is called when cancel is clicked', async function (assert) {
    await renderComponent(assert)
    await confirmModalObject.cancel.click();
    assert.verifySteps(['onClose']);
  });
  
  test('Modal is open if @isOpen is true', async function (assert) {
    await renderComponent(assert)
    assert.dom(confirmModalObject.scope).exists();
  });

  test('Modal is close if @isOpen is false', async function (assert) {
    await renderComponent( assert, false);
    assert.dom(confirmModalObject.scope).doesNotExist();
  });
});

