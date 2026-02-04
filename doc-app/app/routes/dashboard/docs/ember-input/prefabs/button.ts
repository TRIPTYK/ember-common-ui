import Route from '@ember/routing/route';

export default class DocsEmberInputPrefabsButtonRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@label',
          type: 'string',
          required: true,
          description:
            'ember-input.prefabs.button.properties.field.label.description',
        },
        {
          name: '@onClick',
          type: 'function',
          required: true,
          description:
            'ember-input.prefabs.button.properties.field.on-click.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input.prefabs.button.properties.field.disabled.description',
        },
      ],
    };
  }
}
