import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsTimepickerRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.timepicker.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.timepicker.properties.changeset.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.timepicker.properties.label.description',
        },
        {
          name: '@onChange',
          type: 'Function',
          required: false,
          description:
            'ember-input-validation.prefabs.timepicker.properties.onChange.description',
        },
        {
          name: '@onClose',
          type: 'Function',
          required: false,
          description:
            'ember-input-validation.prefabs.timepicker.properties.onClose.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.timepicker.properties.disabled.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.timepicker.properties.mandatory.description',
        },
        {
          name: '@enableSecond',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.timepicker.properties.enableSecond.description',
        },
        {
          name: '@stepping',
          type: 'number',
          required: false,
          description:
            'ember-input-validation.prefabs.timepicker.properties.stepping.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.timepicker.properties.placeholder.description',
        },
        {
          name: '@clearButton',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.timepicker.properties.clearButton.description',
        },
        {
          name: '@locale',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.timepicker.properties.locale.description',
        },
      ],
    };
  }
}
