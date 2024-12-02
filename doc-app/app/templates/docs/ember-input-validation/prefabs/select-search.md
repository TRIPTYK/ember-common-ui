# Select Search

This component provides a powerfull select with search and has built-in validation. It uses [ember-power-select](https://ember-power-select.com/).

It uses also toString() in order to display the options and the selected element.

In example: 

```ts
  options = [
    { label: 'Option 1', value: 'option-1', toString() { return `${this.label}`; } }
  ];
```

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-search-prefab.hbs">
      <Prefabs::TpkValidationSelectSearch
        @label="Try to find out the best repository on Github"
        @options={{this.options}}
        @onSearch={{perform this.onSearch}}
        @changeset={{this.changeset}} 
        @validationField="repository"
        @disabled={{false}}
      />
      <Prefabs::TpkValidationSelectSearch
        @label="Disabled"
        @options={{this.options}}
        @onSearch={{perform this.onSearch}}
        @changeset={{this.changeset}} 
        @validationField="disabled"
        @disabled={{true}}
      />
      <Prefabs::TpkValidationSelectSearch
        @label="Error"
        @options={{this.options}}
        @onSearch={{perform this.onSearch}}
        @changeset={{this.changeset}} 
        @validationField="error"
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-prefab.hbs"/>
</DocsDemo>

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.
- `@options`: The options to display in the select dropdown.
- `@onSearch`: The action to be called when user's typing in the input.

## Optional properties

- `@label`: The label for the input field.
- `@placeholder`: The placeholder text for the input field.
- `@disabled`: Whether the input field is disabled.
- `@multiple`: Whether multiple selections are allowed.
- `@initiallyOpened`: Whether the select dropdown is initially opened.
- `@mandatory`: Whether the textarea field is mandatory.
- `@allowClear`: Whether to show a button to clear the selection.
- `@onChange`: The action to be called when the selection changes. 
- `@labelComponent`: The custom component to use for the label.
- `@selectedItemComponent`: The custom component to use for the selected item.
- `@placeholderComponent`: The custom component to use for the placeholder
- `@searchPlaceholder`: The placeholder text for the search input.
- `@searchMessage`: Message shown in options list when no search has been entered and there are no options.
- `@loadingMessage`: Message shown in options list when loading options.
- `@noMatchesMessage`: Message shown in options list when no matches are found.

## Examples

### Select Search multiple with allowClear

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-search-prefab-multiple.hbs">
      <Prefabs::TpkValidationSelectSearch
        @label="Try to find out all the best repositories on Github"
        @placeholder="Do the best choice"
        @multiple={{true}}
        @onSearch={{perform this.onSearch}}
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="repository"
        @allowClear={{true}}
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-search-prefab-multiple.hbs"/>
</DocsDemo>

### Select Search with all label translate and initially opened

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-search-prefab-multiple.hbs">
      <Prefabs::TpkValidationSelectSearch
        @label="Essaie de trouver le meilleur dépôt sur Github"
        @placeholder="Fais le bon choix"
        @initiallyOpened={{true}}
        @onSearch={{perform this.onSearch}}
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="repository"
        @searchPlaceholder="Recherche un dépôt"
        @searchMessage="Aucun dépôt trouvé pour le moment"
        @loadingMessage="Chargement des dépôts..."
        @noMatchesMessage="Aucun dépôt trouvé"
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-search-prefab-multiple.hbs"/>
</DocsDemo>
