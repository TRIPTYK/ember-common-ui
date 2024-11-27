# Checkbox

This component provides a checkbox.

<DocsDemo as |demo|>
  <demo.example @name="tpk-checkbox-prefab.hbs">
      <Prefabs::TpkValidationCheckbox
        @label="Unchecked"
        @changeset={{this.changeset}}
        @validationField="unchecked"
      />
      <Prefabs::TpkValidationCheckbox
        @label="Checked"
        @changeset={{this.changeset}} 
        @validationField="checked"
      />
      <Prefabs::TpkValidationCheckbox
        @label="Disabled"
        @changeset={{this.changeset}}
        @disabled={{true}}
        @validationField="disabled"
      />
      <Prefabs::TpkValidationCheckbox
        @label="Error"
        @changeset={{this.changeset}}
        @validationField="error"
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
- `@onChange`: The action to be called when the selection changes. 
- `@changeEvent`: The event to trigger the onChange action.
