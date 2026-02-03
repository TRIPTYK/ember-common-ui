// doc-app/app/routes/docs/ember-input-validation/prefabs/input.ts
import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsInputRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.input.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.input.properties.changeset.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.input.properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.input.properties.placeholder.description',
        },
        {
          name: '@type',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.input.properties.type.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.input.properties.mandatory.description',
        },
        {
          name: '@mask',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.input.properties.mask.description',
        },
        {
          name: '@maskOptions',
          type: 'object',
          required: false,
          description:
            'ember-input-validation.prefabs.input.properties.maskOptions.description',
        },
        {
          name: '@unmaskValue',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.input.properties.unmaskValue.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.input.properties.disabled.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.input.properties.onChange.description',
        },
        {
          name: '@changeEvent',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.input.properties.changeEvent.description',
        },
      ],
    };
  }
}
