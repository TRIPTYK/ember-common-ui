import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsSelectRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.select.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.select.properties.changeset.description',
        },
        {
          name: '@options',
          type: 'Array',
          required: true,
          description:
            'ember-input-validation.prefabs.select.properties.options.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.placeholder.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.disabled.description',
        },
        {
          name: '@multiple',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.multiple.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.mandatory.description',
        },
        {
          name: '@initiallyOpened',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.initiallyOpened.description',
        },
        {
          name: '@allowClear',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.allowClear.description',
        },
        {
          name: '@onChange',
          type: 'Function',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.onChange.description',
        },
        {
          name: '@labelComponent',
          type: 'Component',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.labelComponent.description',
        },
        {
          name: '@selectedItemComponent',
          type: 'Component',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.selectedItemComponent.description',
        },
        {
          name: '@placeholderComponent',
          type: 'Component',
          required: false,
          description:
            'ember-input-validation.prefabs.select.properties.placeholderComponent.description',
        },
      ],
    };
  }
}
