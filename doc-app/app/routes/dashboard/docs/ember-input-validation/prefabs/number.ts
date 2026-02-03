// doc-app/app/routes/dashboard/docs/ember-input-validation/prefabs/number.ts
import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsNumberRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.number.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.number.properties.changeset.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.number.properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.number.properties.placeholder.description',
        },
        {
          name: '@unsigned',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.number.properties.unsigned.description',
        },
        {
          name: '@min',
          type: 'number',
          required: false,
          description:
            'ember-input-validation.prefabs.number.properties.min.description',
        },
        {
          name: '@step',
          type: 'number',
          required: false,
          description:
            'ember-input-validation.prefabs.number.properties.step.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.number.properties.mandatory.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.number.properties.disabled.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.number.properties.onChange.description',
        },
        {
          name: '@changeEvent',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.number.properties.changeEvent.description',
        },
        {
          name: '@requiredFields',
          type: 'string[]',
          required: false,
          description:
            'ember-input-validation.prefabs.number.properties.requiredFields.description',
        },
      ],
    };
  }
}
