import Route from '@ember/routing/route';

export default class DocsEmberInputPrefabsToggleRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@label',
          type: 'string',
          required: true,
          description:
            'ember-input.prefabs.toggle.properties.field.label.description',
        },
        {
          name: '@checked',
          type: 'boolean',
          required: false,
          description:
            'ember-input.prefabs.toggle.properties.field.checked.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input.prefabs.toggle.properties.field.disabled.description',
        },
      ],
    };
  }
}
