import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsSelectCreateRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.select-create.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'Changeset',
          required: true,
          description:
            'ember-input-validation.prefabs.select-create.properties.changeset.description',
        },
        {
          name: '@options',
          type: 'Array',
          required: true,
          description:
            'ember-input-validation.prefabs.select-create.properties.options.description',
        },
        {
          name: '@onCreate',
          type: 'function',
          required: true,
          description:
            'ember-input-validation.prefabs.select-create.properties.onCreate.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.placeholder.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.disabled.description',
        },
        {
          name: '@multiple',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.multiple.description',
        },
        {
          name: '@initiallyOpened',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.initiallyOpened.description',
        },
        {
          name: '@allowClear',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.allowClear.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.mandatory.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.onChange.description',
        },
        {
          name: '@labelComponent',
          type: 'Component',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.labelComponent.description',
        },
        {
          name: '@selectedItemComponent',
          type: 'Component',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.selectedItemComponent.description',
        },
        {
          name: '@placeholderComponent',
          type: 'Component',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.placeholderComponent.description',
        },
        {
          name: '@onSearch',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.onSearch.description',
        },
        {
          name: '@searchPlaceholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.searchPlaceholder.description',
        },
        {
          name: '@searchMessage',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.searchMessage.description',
        },
        {
          name: '@loadingMessage',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.loadingMessage.description',
        },
        {
          name: '@noMatchesMessage',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.noMatchesMessage.description',
        },
        {
          name: '@showCreateWhen',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.showCreateWhen.description',
        },
        {
          name: '@buildSuggestion',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.select-create.properties.buildSuggestion.description',
        },
      ],
    };
  }
}
