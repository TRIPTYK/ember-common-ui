import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import { render } from '@ember/test-helpers';
import { TableGenericUserWorker } from 'doc-app/tests/workers/table-generic';
import { worker } from 'doc-app/tests/worker';
import TpkTableGenericPrefab from '@triptyk/ember-ui/components/prefabs/tpk-table-generic-prefab';

module('Integration | Component | Prefabs | Tpk-table-generic-prefab', function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');

  hooks.beforeEach(async function () {
    await TableGenericUserWorker(worker);
  });
  
  async function renderComponent(){
    const columns = [
      {
      field: 'lastName',
      headerName: 'Nom',
      sortable: true,
    },
      {
      field: 'fisrtName',
      headerName: 'Prénom',
      sortable: true,
    }];

    await render(
      <template>
        <TpkTableGenericPrefab @entity="user" @columns={{columns}}/>
      </template>
    )
  }

  test('Render prefab table generic', async function(assert) {
    await renderComponent()
    await this.pauseTest();
    assert.dom('[data-test-table-generic-container]').exists();
  });

})