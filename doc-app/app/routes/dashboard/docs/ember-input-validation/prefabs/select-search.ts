import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsSelectSearchRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.select-search.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'Changeset',
          required: true,
          description:
            'ember-input-validation.prefabs.select-search.properties.changeset.description',
        },
        {
          name: '@options',
          type: 'Array',
          required: true,
          description:
            'ember-input-validation.prefabs.select-search.properties.options.description',
        },
        {
          name: '@onSearch',
          type: 'function',
          required: true,
          description:
            'ember-input-validation.prefabs.select-search.properties.onSearch.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.placeholder.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.disabled.description',
        },
        {
          name: '@multiple',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.multiple.description',
        },
        {
          name: '@initiallyOpened',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.initiallyOpened.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.mandatory.description',
        },
        {
          name: '@allowClear',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.allowClear.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.onChange.description',
        },
        {
          name: '@labelComponent',
          type: 'Component',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.labelComponent.description',
        },
        {
          name: '@selectedItemComponent',
          type: 'Component',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.selectedItemComponent.description',
        },
        {
          name: '@placeholderComponent',
          type: 'Component',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.placeholderComponent.description',
        },
        {
          name: '@searchPlaceholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.searchPlaceholder.description',
        },
        {
          name: '@searchMessage',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.searchMessage.description',
        },
        {
          name: '@loadingMessage',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.loadingMessage.description',
        },
        {
          name: '@noMatchesMessage',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-search.properties.noMatchesMessage.description',
        },
      ],
    };
  }
}
