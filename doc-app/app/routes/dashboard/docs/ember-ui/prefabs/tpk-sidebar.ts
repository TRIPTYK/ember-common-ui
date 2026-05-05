import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabsTpkSidebarRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@sidebarItems',
          type: 'SidebarItem[]',
          required: false,
          description:
            'ember-ui.prefabs.tpk-sidebar.properties.sidebarItems.description',
        },
        {
          name: '@drawerId',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-sidebar.properties.drawerId.description',
        },
        {
          name: '@collapsed',
          type: 'boolean',
          required: false,
          description:
            'ember-ui.prefabs.tpk-sidebar.properties.collapsed.description',
        },
        {
          name: '@onCollapsedChange',
          type: '(collapsed: boolean) => void',
          required: false,
          description:
            'ember-ui.prefabs.tpk-sidebar.properties.onCollapsedChange.description',
        },
      ],
    };
  }
}
