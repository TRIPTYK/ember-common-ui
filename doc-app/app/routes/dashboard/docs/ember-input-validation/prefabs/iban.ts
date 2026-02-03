// doc-app/app/routes/docs/ember-input-validation/prefabs/iban.ts
import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsIbanRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.iban.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.iban.properties.changeset.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.iban.properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.iban.properties.placeholder.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.iban.properties.disabled.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.iban.properties.mandatory.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.iban.properties.onChange.description',
        },
        {
          name: '@changeEvent',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.iban.properties.changeEvent.description',
        },
      ],
    };
  }
}
