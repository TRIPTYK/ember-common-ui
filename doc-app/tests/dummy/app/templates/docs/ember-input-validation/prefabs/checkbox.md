# Checkbox

This component provides a checkbox.

<DocsDemo as |demo|>
  <demo.example @name="tpk-checkbox-prefab.hbs">
      <Prefabs::TpkValidationCheckbox
        @label="Should I delete this?"
        @changeset={{this.changeset}} 
        @validationField="deleteThis"
      />
  </demo.example>
  <demo.snippet @name="tpk-checkbox-prefab.hbs"/>
</DocsDemo>

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.

## Optional properties

- `@label`: The label for the input field.
- `@disabled`: Whether the input field is disabled.
- `@mandatory`: Whether the textarea field is mandatory.
- `@classless`: Whether to apply default classes to the component.
- `@onChange`: The action to be called when the selection changes. 
- `@changeEvent`: The event to trigger the onChange action.
