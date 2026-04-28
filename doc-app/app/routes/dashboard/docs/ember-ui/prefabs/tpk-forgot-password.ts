import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabsTpkForgotPasswordRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@onSubmit',
          type: 'Function',
          required: true,
          description:
            'ember-ui.prefabs.tpk-forgot-password.properties.onSubmit.description',
        },
        {
          name: '@forgotPasswordSchema',
          type: 'ZodObject<{ email }>',
          required: true,
          description:
            'ember-ui.prefabs.tpk-forgot-password.properties.forgotPasswordSchema.description',
        },
        {
          name: '@initialValues',
          type: '{ email: string }',
          required: false,
          description:
            'ember-ui.prefabs.tpk-forgot-password.properties.initialValues.description',
        },
        {
          name: '@submitButtonText',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-forgot-password.properties.submitButtonText.description',
        },
      ],
    };
  }
}
