# Input File

This is an input with type File

<DocsDemo as |demo|>
  <demo.example @name="prefab-tpk-file.hbs">
      <Prefabs::TpkValidationFile 
        @label="File"
        @changeset={{this.changeset}} 
        @validationField="file"
        @mandatory=true
      />
      <Prefabs::TpkValidationFile 
        @label="Disabled"
        @changeset={{this.changeset}} 
        @validationField="disabled"
        @mandatory=true
        @disabled=true
      />
      <Prefabs::TpkValidationFile 
        @label="Error"
        @changeset={{this.changeset}} 
        @validationField="error"
        @mandatory=true
      />
  </demo.example>
  <demo.snippet @name="prefab-tpk-file.hbs"/>
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