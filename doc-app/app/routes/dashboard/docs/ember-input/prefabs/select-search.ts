import Route from '@ember/routing/route';

export default class DocsEmberInputPrefabsSelectSearchRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@options',
          type: 'Array',
          required: true,
          description:
            'ember-input.prefabs.selectSearch.properties.field.options.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: true,
          description:
            'ember-input.prefabs.selectSearch.properties.field.onChange.description',
        },
        {
          name: '@onCreate',
          type: 'function',
          required: true,
          description:
            'ember-input.prefabs.selectSearch.properties.field.onCreate.description',
        },
        {
          name: '@search',
          type: 'function',
          required: true,
          description:
            'ember-input.prefabs.selectSearch.properties.field.search.description',
        },
        {
          name: '@label',
          type: 'string',
          required: true,
          description:
            'ember-input.prefabs.selectSearch.properties.field.label.description',
        },
        {
          name: '@selected',
          type: 'unknown',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.selected.description',
        },
        {
          name: '@searchEnabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.searchEnabled.description',
        },
        {
          name: '@searchPlaceholder',
          type: 'string',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.searchPlaceholder.description',
        },
        {
          name: '@searchMessage',
          type: 'string',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.searchMessage.description',
        },
        {
          name: '@loadingMessage',
          type: 'string',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.loadingMessage.description',
        },
        {
          name: '@noMatchesMessage',
          type: 'string',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.noMatchesMessage.description',
        },
        {
          name: '@searchField',
          type: 'string',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.searchField.description',
        },
        {
          name: '@multiple',
          type: 'boolean',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.multiple.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.placeholder.description',
        },
        {
          name: '@allowClear',
          type: 'boolean',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.allowClear.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.disabled.description',
        },
        {
          name: '@renderInPlace',
          type: 'boolean',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.renderInPlace.description',
        },
        {
          name: '@initiallyOpened',
          type: 'boolean',
          required: false,
          description:
            'ember-input.prefabs.selectSearch.properties.field.initiallyOpened.description',
        },
      ],
    };
  }
}
