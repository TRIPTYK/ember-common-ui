// doc-app/app/routes/docs/ember-input-validation/prefabs/email.ts
import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsEmailRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.email.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.email.properties.changeset.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.email.properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.email.properties.placeholder.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.email.properties.disabled.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.email.properties.mandatory.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.email.properties.onChange.description',
        },
        {
          name: '@changeEvent',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.email.properties.changeEvent.description',
        },
      ],
    };
  }
}
