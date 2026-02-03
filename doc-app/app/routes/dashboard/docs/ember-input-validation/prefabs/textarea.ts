import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsTextareaRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.textarea.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.textarea.properties.changeset.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.textarea.properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.textarea.properties.placeholder.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.textarea.properties.mandatory.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.textarea.properties.disabled.description',
        },
        {
          name: '@onChange',
          type: 'Function',
          required: false,
          description:
            'ember-input-validation.prefabs.textarea.properties.onChange.description',
        },
        {
          name: '@changeEvent',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.textarea.properties.changeEvent.description',
        },
        {
          name: '@maxLength',
          type: 'number',
          required: false,
          description:
            'ember-input-validation.prefabs.textarea.properties.maxLength.description',
        },
      ],
    };
  }
}
