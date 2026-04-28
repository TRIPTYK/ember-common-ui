import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabsTpkDashboardRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@title',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.title.description',
        },
        {
          name: '@sidebarItems',
          type: 'SidebarItem[]',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.sidebarItems.description',
        },
        {
          name: '@navbarItems',
          type: 'NavbarItem[]',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.navbarItems.description',
        },
        {
          name: '@currentUser',
          type: '{ fullName: string }',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.currentUser.description',
        },
        {
          name: '@onLogout',
          type: 'Function',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.onLogout.description',
        },
        {
          name: '@logoutLabel',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.logoutLabel.description',
        },
        {
          name: '@profileRoute',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.profileRoute.description',
        },
        {
          name: '@profileLabel',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.profileLabel.description',
        },
        {
          name: '@drawerId',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.drawerId.description',
        },
        {
          name: '@collapsed',
          type: 'boolean',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.collapsed.description',
        },
        {
          name: '@onCollapsedChange',
          type: 'Function',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.onCollapsedChange.description',
        },
        {
          name: '@onSidebarToggle',
          type: 'Function',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.onSidebarToggle.description',
        },
        {
          name: '@languages',
          type: 'Language[]',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.languages.description',
        },
        {
          name: '@onLocaleChange',
          type: 'Function',
          required: false,
          description:
            'ember-ui.prefabs.tpk-dashboard.properties.onLocaleChange.description',
        },
      ],
    };
  }
}
