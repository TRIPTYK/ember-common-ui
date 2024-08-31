# Select

Prefab select that accepts an array of options.

It uses toString() in order to display the options and the selected element.

In example: 

```ts
  options = [
    { label: 'Option 1', value: 'option-1', toString() { return this.label; } }
  ];
```

The value in the changeset is set to null if the reset button is hit.

<DocsDemo as |demo|>
  <demo.example @name="tpk-select-prefab.hbs">
      <Prefabs::TpkValidationSelect
        @label="Select"
        @placeholder="Select something"
        @options={{this.options}}
        @changeset={{this.changeset}} 
        @validationField="name"
        @changeEvent="change"
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-select-prefab.hbs"/>
</DocsDemo>
