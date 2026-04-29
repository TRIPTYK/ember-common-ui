import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabsTpkResetPasswordRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@onSubmit',
          type: 'Function',
          required: true,
          description:
            'ember-ui.prefabs.tpk-reset-password.properties.onSubmit.description',
        },
        {
          name: '@resetPasswordSchema',
          type: 'ZodObject<{ password, confirmPassword }>',
          required: true,
          description:
            'ember-ui.prefabs.tpk-reset-password.properties.resetPasswordSchema.description',
        },
        {
          name: '@initialValues',
          type: '{ password: string; confirmPassword: string }',
          required: false,
          description:
            'ember-ui.prefabs.tpk-reset-password.properties.initialValues.description',
        },
        {
          name: '@submitButtonText',
          type: 'string',
          required: false,
          description:
            'ember-ui.prefabs.tpk-reset-password.properties.submitButtonText.description',
        },
      ],
    };
  }
}
