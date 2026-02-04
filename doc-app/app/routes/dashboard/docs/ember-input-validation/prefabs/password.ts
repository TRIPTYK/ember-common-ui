import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsPasswordRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.password.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.password.properties.changeset.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.password.properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.password.properties.placeholder.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.password.properties.mandatory.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.password.properties.disabled.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.password.properties.onChange.description',
        },
        {
          name: '@changeEvent',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.password.properties.changeEvent.description',
        },
      ],
    };
  }
}
