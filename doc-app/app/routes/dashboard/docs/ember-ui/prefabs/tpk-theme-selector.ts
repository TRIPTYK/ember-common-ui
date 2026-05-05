import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabsTpkThemeSelectorRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@themes',
          type: 'string[]',
          required: false,
          description:
            'ember-ui.prefabs.tpk-theme-selector.properties.themes.description',
        },
        {
          name: '@localStorageKey',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-theme-selector.properties.localStorageKey.description',
        },
        {
          name: '@sidebarCollapsed',
          type: 'boolean',
          required: false,
          description:
            'ember-ui.prefabs.tpk-theme-selector.properties.sidebarCollapsed.description',
        },
      ],
    };
  }
}
