import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabsTpkNavbarRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@title',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.title.description',
        },
        {
          name: '@navbarItems',
          type: 'NavbarItem[]',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.navbarItems.description',
        },
        {
          name: '@drawerId',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.drawerId.description',
        },
        {
          name: '@onSidebarToggle',
          type: '() => void',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.onSidebarToggle.description',
        },
        {
          name: '@languages',
          type: 'Language[]',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.languages.description',
        },
        {
          name: '@onLocaleChange',
          type: '(locale: string) => void',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.onLocaleChange.description',
        },
        {
          name: '@currentUser',
          type: '{ fullName: string }',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.currentUser.description',
        },
        {
          name: '@onLogout',
          type: '() => void',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.onLogout.description',
        },
        {
          name: '@logoutLabel',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.logoutLabel.description',
        },
        {
          name: '@profileRoute',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.profileRoute.description',
        },
        {
          name: '@profileLabel',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-navbar.properties.profileLabel.description',
        },
      ],
    };
  }
}
