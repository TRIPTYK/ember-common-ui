// doc-app/app/routes/docs/ember-input-validation/prefabs/input.ts
import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsInputRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description: 'The field name in the changeset for validation.',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description: 'The changeset object for form validation.',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description: 'The label for the input field.',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description: 'The placeholder text for the input field.',
        },
        {
          name: '@type',
          type: 'string',
          required: false,
          description: "The type of the input field. Defaults to 'text'.",
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description: 'Whether the input field is mandatory.',
        },
        {
          name: '@mask',
          type: 'string',
          required: false,
          description: 'The mask to apply to the input field.',
        },
        {
          name: '@maskOptions',
          type: 'object',
          required: false,
          description: 'The options to apply to the mask.',
        },
        {
          name: '@unmaskValue',
          type: 'boolean',
          required: false,
          description: 'Whether to unmask the value before setting it in the changeset.',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description: 'Whether the input field is disabled.',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description: 'The action to be called when the value changes.',
        },
        {
          name: '@changeEvent',
          type: 'string',
          required: false,
          description: 'The event to trigger the onChange action.',
        },
      ],
    };
  }
}
