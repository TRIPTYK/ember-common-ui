import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabsTpkFormRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-ui.prefabs.tpk-form.properties.changeset.description',
        },
        {
          name: '@onSubmit',
          type: 'Function',
          required: true,
          description:
            'ember-ui.prefabs.tpk-form.properties.onSubmit.description',
        },
        {
          name: '@validationSchema',
          type: 'ZodObject',
          required: true,
          description:
            'ember-ui.prefabs.tpk-form.properties.validationSchema.description',
        },
        {
          name: '@reactive',
          type: 'Boolean',
          required: false,
          description:
            'ember-ui.prefabs.tpk-form.properties.reactive.description',
        },
        {
          name: '@removeErrorsOnSubmit',
          type: 'Boolean',
          required: false,
          description:
            'ember-ui.prefabs.tpk-form.properties.removeErrorsOnSubmit.description',
        },
        {
          name: '@autoScrollOnError',
          type: 'Boolean',
          required: false,
          description:
            'ember-ui.prefabs.tpk-form.properties.autoScrollOnError.description',
        },
        {
          name: '@disabled',
          type: 'Boolean',
          required: false,
          description:
            'ember-ui.prefabs.tpk-form.properties.disabled.description',
        },
        {
          name: '@executeOnValid',
          type: 'Boolean',
          required: false,
          description:
            'ember-ui.prefabs.tpk-form.properties.executeOnValid.description',
        },
      ],
    };
  }
}
