# Select Create

This component provides a powerfull select with ability to create a new value and has built-in validation. It uses [ember-power-select](https://ember-power-select.com/) and [ember-power-select-with-create](https://github.com/cibernox/ember-power-select-with-create).

It uses also toString() in order to display the options and the selected element.

In example: 

```ts
  options = [
    { label: 'Option 1', value: 'option-1', toString() { return `${this.label}`; } }
  ];
```

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-create-prefab.hbs">
      <Prefabs::TpkValidationSelectCreate
        @label="Select or add your CEO"
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="ceo"
        @onCreate={{this.onCreate}}
        @disabled={{false}}
      />
      <Prefabs::TpkValidationSelectCreate
        @label="Disabled"
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="disabled"
        @onCreate={{this.onCreate}}
        @disabled={{true}}
      />
      <Prefabs::TpkValidationSelectCreate
        @label="Error"
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="error"
        @onCreate={{this.onCreate}}
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-create-prefab.hbs"/>
</DocsDemo>

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.
- `@options`: The options to display in the select dropdown.
- `@onCreate`: The action to be called when user creates a new value.

## Optional properties

- `@label`: The label for the input field.
- `@placeholder`: The placeholder text for the input field.
- `@disabled`: Whether the input field is disabled.
- `@multiple`: Whether multiple selections are allowed.
- `@initiallyOpened`: Whether the select dropdown is initially opened.
- `@allowClear`: Whether to show a button to clear the selection.
- `@mandatory`: Whether the textarea field is mandatory.
- `@onChange`: The action to be called when the selection changes. 
- `@labelComponent`: The custom component to use for the label.
- `@selectedItemComponent`: The custom component to use for the selected item.
- `@placeholderComponent`: The custom component to use for the placeholder
- `@onSearch`: The action to be called when user's typing in the input.
- `@searchPlaceholder`: The placeholder text for the search input.
- `@searchMessage`: Message shown in options list when no search has been entered and there are no options.
- `@loadingMessage`: Message shown in options list when loading options.
- `@noMatchesMessage`: Message shown in options list when no matches are found.
- `@showCreateWhen`: The action to be called to determine if the create option should be shown.
- `@buildSuggestion`: The action to be called to build the suggestion label.

## Examples

### Select create multiple

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-create-prefab-multiple.hbs">
      <Prefabs::TpkValidationSelectCreate
        @label="Select multiple CEO"
        @placeholder="Do the best choice"
        @multiple={{true}}
        @onCreate={{this.onCreateBis}}
        @options={{this.options}}
        @changeset={{this.changesetBis}} 
        @validationField="ceo"
        @allowClear={{true}}
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-create-prefab-multiple.hbs"/>
</DocsDemo>

### Select create with specific label and hide create option when value already exist
To test it, write Romain in input

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-create-prefab-build-show.hbs">
      <Prefabs::TpkValidationSelectCreate
        @label="Select or create CEO"
        @onCreate={{this.onCreate}}
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="ceo"
        @showCreateWhen={{this.showCreateWhen}}
        @buildSuggestion={{this.buildSuggestion}}
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-create-prefab-build-show.hbs"/>
</DocsDemo>
