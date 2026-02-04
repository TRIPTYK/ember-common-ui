import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsRadioRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.radio.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'Changeset',
          required: true,
          description:
            'ember-input-validation.prefabs.radio.properties.changeset.description',
        },
        {
          name: '@value',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.radio.properties.value.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.radio.properties.label.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.radio.properties.mandatory.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.radio.properties.disabled.description',
        },
        {
          name: '@classless',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.radio.properties.classless.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.radio.properties.onChange.description',
        },
      ],
    };
  }
}
