import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsCheckboxRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'emberInputValidation.prefabs.checkbox.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'Changeset',
          required: true,
          description:
            'emberInputValidation.prefabs.checkbox.properties.changeset.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'emberInputValidation.prefabs.checkbox.properties.label.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'emberInputValidation.prefabs.checkbox.properties.mandatory.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'emberInputValidation.prefabs.checkbox.properties.disabled.description',
        },
        {
          name: '@onChange',
          type: '(isChecked: boolean, value: string, e: Event) => void',
          required: false,
          description:
            'emberInputValidation.prefabs.checkbox.properties.onChange.description',
        },
      ],
    };
  }
}
