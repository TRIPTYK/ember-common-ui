import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsRadioGroupRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.radio-group.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'Changeset',
          required: true,
          description:
            'ember-input-validation.prefabs.radio-group.properties.changeset.description',
        },
        {
          name: '@value',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.radio-group.properties.value.description',
        },
        {
          name: '@groupLabel',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.radio-group.properties.groupLabel.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.radio-group.properties.mandatory.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.radio-group.properties.disabled.description',
        },
        {
          name: '@classless',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.radio-group.properties.classless.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.radio-group.properties.onChange.description',
        },
      ],
    };
  }
}
