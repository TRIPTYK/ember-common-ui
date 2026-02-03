// doc-app/app/routes/docs/ember-input-validation/prefabs/file-list.ts
import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsFileListRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.file-list.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.file-list.properties.changeset.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.file-list.properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.file-list.properties.placeholder.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.file-list.properties.disabled.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.file-list.properties.mandatory.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.file-list.properties.onChange.description',
        },
        {
          name: '@disableDownload',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.file-list.properties.disableDownload.description',
        },
      ],
    };
  }
}
