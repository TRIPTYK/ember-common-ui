# Select

This component provides a powerfull select with multitude features and has built-in validation. It uses [ember-power-select](https://ember-power-select.com/).

It uses also toString() in order to display the options and the selected element.

In example: 

```ts
  options = [
    { label: 'Option 1', value: 'option-1', toString() { return `${this.label}`; } }
  ];
```

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-prefab.hbs">
      <Prefabs::TpkValidationSelect
        @label="Select your CEO"
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="ceo"
        @disabled={{false}}
      />
      <Prefabs::TpkValidationSelect
        @label="Disabled"
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="disabled"
        @disabled={{false}}
      />
      <Prefabs::TpkValidationSelect
        @label="Error"
        @options={{this.options}}
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

## Optional properties

- `@label`: The label for the input field.
- `@placeholder`: The placeholder text for the input field.
- `@disabled`: Whether the input field is disabled.
- `@multiple`: Whether multiple selections are allowed.
- `@mandatory`: Whether the textarea field is mandatory.
- `@initiallyOpened`: Whether the select dropdown is initially opened.
- `@allowClear`: Whether to show a button to clear the selection.
- `@onChange`: The action to be called when the selection changes. 
- `@labelComponent`: The custom component to use for the label.
- `@selectedItemComponent`: The custom component to use for the selected item.
- `@placeholderComponent`: The custom component to use for the placeholder

## Examples

### Select multiple

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-prefab-multiple.hbs">
      <Prefabs::TpkValidationSelect
        @label="Select multiple CEO"
        @placeholder="Do the best choice"
        @multiple={{true}}
        @options={{this.options}}
        @changeset={{this.changesetTris}} 
        @validationField="ceo"
        @allowClear={{true}}
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-prefab-multiple.hbs"/>
</DocsDemo>

### Select with specific component for label

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-prefab-label.hbs">
      <Prefabs::TpkValidationSelect
        @label="Select multiple CEO"
        @labelComponent={{component "dummy-label-select"}}
        @multiple={{true}}
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="ceo"
        @allowClear={{true}}
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-prefab-label.hbs"/>

  <!-- <demo.example @name="dummy-label-select.hbs">
      <label>BEST LABEL EVER: {{@labelText}}</label>
  </demo.example> -->
  <demo.snippet @name="dummy-label-select.hbs" @label="dummy-label-select.hbs"/>
</DocsDemo>

### Select with allowClear

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-prefab-allowClear.hbs">
      <Prefabs::TpkValidationSelect
        @label="Select your CEO"
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="ceo"
        @allowClear={{true}}
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-prefab-allowClear.hbs"/>
</DocsDemo>

### Select initially opened

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-prefab-initially.hbs">
      <Prefabs::TpkValidationSelect
        @label="Select your CEO"
        @placeholder="Select the best CEO"
        @options={{this.options}}
        @changeset={{this.changesetBis}} 
        @validationField="ceo"
        @initiallyOpened={{true}}
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-prefab-initially.hbs"/>
</DocsDemo>
