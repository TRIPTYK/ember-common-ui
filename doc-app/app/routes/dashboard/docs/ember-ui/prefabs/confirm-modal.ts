import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabsConfirmModalRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@onClose',
          type: 'Function',
          required: true,
          description:
            'ember-ui.prefabs.confirm-modal.properties.onClose.description',
        },
        {
          name: '@onConfirm',
          type: 'Function',
          required: true,
          description:
            'ember-ui.prefabs.confirm-modal.properties.onConfirm.description',
        },
        {
          name: '@cancelText',
          type: 'string',
          required: true,
          description:
            'ember-ui.prefabs.confirm-modal.properties.cancelText.description',
        },
        {
          name: '@confirmText',
          type: 'string',
          required: true,
          description:
            'ember-ui.prefabs.confirm-modal.properties.confirmText.description',
        },
        {
          name: '@confirmQuestion',
          type: 'string',
          required: true,
          description:
            'ember-ui.prefabs.confirm-modal.properties.confirmQuestion.description',
        },
        {
          name: '@isOpen',
          type: 'boolean',
          required: true,
          description:
            'ember-ui.prefabs.confirm-modal.properties.isOpen.description',
        },
      ],
    };
  }
}
