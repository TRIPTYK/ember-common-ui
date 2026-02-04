import Route from '@ember/routing/route';
import { setupWorker } from 'msw/browser';
import { http } from 'msw';

const fakeData = [
  {
    type: 'user',
    id: '1',
    attributes: {
      lastName: 'Giga',
      firstName: 'Chad',
      email: 'info@triptyk.eu',
    },
  },
  {
    type: 'user',
    id: '2',
    attributes: {
      lastName: 'Marc',
      firstName: 'Jean',
      email: 'info@triptyk.eu',
    },
  },
  {
    type: 'user',
    id: '3',
    attributes: {
      lastName: 'Lepond',
      firstName: 'Louis',
      email: 'info@triptyk.eu',
    },
  },
  {
    type: 'user',
    id: '4',
    attributes: {
      lastName: 'Dragon',
      firstName: 'Lucas',
      email: 'info@triptyk.eu',
    },
  },
  {
    type: 'user',
    id: '5',
    attributes: {
      lastName: 'Leroy',
      firstName: 'Simon',
      email: 'info@triptyk.eu',
    },
  },
];

const worker = setupWorker(
  http.get('/users', () => {
    return Response.json({
      data: fakeData,
      meta: { fetched: fakeData.length, total: fakeData.length },
    });
  })
);

export default class DocsEmberUiPrefabsTpkTableGenericPrefabRoute extends Route {
  async model() {
    await worker.start();

    return {
      properties: [
        {
          name: 'tableParams',
          type: 'TableParams',
          required: true,
          description:
            'ember-ui.prefabs.tpk-table-generic-prefab.properties.tableParams.description',
        },
        {
          name: 'columnsComponent',
          type: 'Record<string, Invokable<any>>',
          required: false,
          description:
            'ember-ui.prefabs.tpk-table-generic-prefab.properties.columnsComponent.description',
        },
        {
          name: 'entity',
          type: 'string',
          required: true,
          description:
            'ember-ui.prefabs.tpk-table-generic-prefab.properties.entity.description',
        },
        {
          name: 'pageSizes',
          type: 'number[]',
          required: false,
          description:
            'ember-ui.prefabs.tpk-table-generic-prefab.properties.pageSizes.description',
        },
        {
          name: 'defaultSortColumn',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-table-generic-prefab.properties.defaultSortColumn.description',
        },
        {
          name: 'additionalFilters',
          type: 'Record<string, string>',
          required: false,
          description:
            'ember-ui.prefabs.tpk-table-generic-prefab.properties.additionalFilters.description',
        },
        {
          name: 'relationships',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-table-generic-prefab.properties.relationships.description',
        },
        {
          name: 'rowClick',
          type: '(element?: unknown, e?: Event) => void',
          required: false,
          description:
            'ember-ui.prefabs.tpk-table-generic-prefab.properties.rowClick.description',
        },
        {
          name: 'columns',
          type: 'Column[]',
          required: true,
          description:
            'ember-ui.prefabs.tpk-table-generic-prefab.properties.columns.description',
        },
        {
          name: 'actionMenu',
          type: 'ActionMenuItem[]',
          required: false,
          description:
            'ember-ui.prefabs.tpk-table-generic-prefab.properties.actionMenu.description',
        },
      ],
    };
  }
}
