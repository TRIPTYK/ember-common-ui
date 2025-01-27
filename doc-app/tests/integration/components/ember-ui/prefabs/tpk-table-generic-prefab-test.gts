import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import { click, findAll, render } from '@ember/test-helpers';
import { TableGenericUserWorker } from 'doc-app/tests/workers/table-generic';
import { worker } from 'doc-app/tests/worker';
import TpkTableGenericPrefab from '@triptyk/ember-ui/components/prefabs/tpk-table-generic-prefab';
import type { TableParams } from '@triptyk/ember-ui/components/prefabs/tpk-table-generic-prefab';
import TpkSelect from '@triptyk/ember-input/components/tpk-select';
import type { TOC } from '@ember/component/template-only';
import type { TpkSelectSignature } from '@triptyk/ember-input/components/tpk-select';
import { hash } from '@ember/helper';
import { selectChoose } from 'ember-power-select/test-support';

const TpkSelectElement: TOC<TpkSelectSignature & {
    Args: {
      cellValue: string
    }
}> = <template>
  <div data-test-table-generic-select>
  <TpkSelect  @options={{@options}} @onChange={{@onChange}} @selected={{@cellValue}} @label="" as |S| >
    <S.Option as |O|>
      {{O.option}}
    </S.Option>
  </TpkSelect>
  </div>
</template>;

module('Integration | Component | Prefabs | Tpk-table-generic-prefab', function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');

  let tableParams:TableParams = {
      entity: 'user',
      pageSizes: [10,30,50,75],
      defaultSortColumn: 'firstName',
      columns:[
      {
      field: 'lastName',
      headerName: 'Nom',
      sortable: true,
    },
      {
      field: 'firstName',
      headerName: 'Prénom',
      sortable: true,
    },
      {
      field: 'email',
      headerName: 'Email',
      sortable: false,
    }],
    actionMenu: [],
    };
  hooks.beforeEach(async function () {
    await TableGenericUserWorker(worker);
  });
  
  async function renderComponent(tableParams : TableParams){
    await render(
      <template>
        <TpkTableGenericPrefab @tableParams={{tableParams}} />
      </template>
    )
  }

  test('Render prefab table generic', async function(assert) {
    await renderComponent(tableParams)
    assert.dom('[data-test-table-generic-prefab]').exists();
  });

  test('It has the same number of columns as the object', async function(assert) {
    await renderComponent(tableParams)
    const columnsNumber = tableParams.columns.length;
    const columns = document.querySelectorAll('[data-test-table-generic-prefab] [data-test-row="1"] td').length;
    assert.deepEqual(columns, columnsNumber);
  })

  test('It passes correctly the actionMenu', async function(assert) {
     const actionMenu = [{
        icon: 'edit',
        action: () => {assert.step('rowClick function called') },
        name: 'Edit',
      },
      {
        icon: 'delete',
        action: () => { 
          assert.step('delete function called');
        },
        name: 'Delete',
      },]
    tableParams ={
      ...tableParams,
      actionMenu: actionMenu,}
      
    await renderComponent(tableParams)
    const deleteButtons = findAll('[data-test-actions-open-action]');
    assert.strictEqual(
      deleteButtons.length,
      5,
      'Correct number of delete buttons rendered',
    );
    const editButtons = findAll('[data-test-actions-open-action]');
    assert.strictEqual(
      editButtons.length,
      5,
      'Correct number of edit buttons rendered',
    );
    await click('[data-test-actions-open-action]');

    await click('[data-test-actions-menu] li:first-child button')
    assert.verifySteps(['rowClick function called']);

     await click('[data-test-actions-open-action]');
    await click('[data-test-actions-menu] li:last-child button');
    assert.verifySteps(['delete function called']);
  })

  test('it can sort by default', async function(assert) {

    await renderComponent(tableParams);
    assert.dom('[data-test-table-generic-prefab] [data-test-row="1"] td:nth-child(2)')?.hasText('Simon');
  });

  test('it passes a renderElement', async function(assert) {
    const tableParamsWithFunctions:TableParams = {
      entity: 'user',
      pageSizes: [10,30,50,75],
      defaultSortColumn: 'firstName',
      columns:[
      {
      field: 'lastName',
      headerName: 'Nom',
      renderElement: (element:unknown) => { return `Mr ${element}` },
      sortable: true,
      },
      {
      field: 'firstName',
      headerName: 'Prénom',
      sortable: true,
      },
      {
      field: 'email',
      headerName: 'Email',
      sortable:false,
      },],
      actionMenu: [],
    };
    await renderComponent(tableParamsWithFunctions);
    assert.dom('[data-test-table-generic-prefab] [data-test-row="1"] td:nth-child(1)')?.hasText('Mr Leroy');
  });

  test('it passes a component', async function(assert) {
    const emailOptions = ['info@triptyk.eu','loempia@triptyk.eu']
    const onChange = (selection: unknown) =>{
      assert.step(selection as string);
    }

    const tableParamsWithFunctions:TableParams = {
      entity: 'user',
      pageSizes: [10,30,50,75],
      defaultSortColumn: 'firstName',
      columns:[
      {
      field: 'lastName',
      headerName: 'Nom',
      sortable: true,
      },
      {
      field: 'firstName',
      headerName: 'Prénom',
      sortable: true,
      },
      {
      field: 'email',
      headerName: 'Email',
      sortable:false,
      component : 'selectEmail',
      },],
      actionMenu: [],
    };

    await render(
      <template>
        <TpkTableGenericPrefab
          @tableParams={{tableParamsWithFunctions}} 
          @columnsComponent={{hash
            selectEmail=(component
              TpkSelectElement
                options=emailOptions
                onChange=onChange
                data-test-table-generic-table=true
            )
          }}
      />
      </template>
    )
    assert.dom('[data-test-table-generic-prefab] td:nth-child(3) [data-test-table-generic-select]').exists();
    const selectSelector = '[data-test-table-generic-prefab] td:nth-child(3) [data-test-table-generic-select] .tpk-select-trigger'
    await selectChoose(selectSelector, "loempia@triptyk.eu")

    assert.verifySteps(['loempia@triptyk.eu']);
  });
  
})