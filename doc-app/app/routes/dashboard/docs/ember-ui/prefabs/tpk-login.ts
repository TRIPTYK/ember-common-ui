import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabsTpkLoginRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@onSubmit',
          type: 'Function',
          required: true,
          description:
            'ember-ui.prefabs.tpk-login.properties.onSubmit.description',
        },
        {
          name: '@loginSchema',
          type: 'ZodObject<{ email, password }>',
          required: true,
          description:
            'ember-ui.prefabs.tpk-login.properties.loginSchema.description',
        },
        {
          name: '@initialValues',
          type: '{ email: string; password: string }',
          required: false,
          description:
            'ember-ui.prefabs.tpk-login.properties.initialValues.description',
        },
        {
          name: '@submitButtonText',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-login.properties.submitButtonText.description',
        },
      ],
    };
  }
}
