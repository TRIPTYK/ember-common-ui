# Textarea

This component provides an textarea.

<DocsDemo as |demo|>
  <demo.example @name="tpk-textarea-prefab.hbs">
      <Prefabs::TpkValidationTextarea
        @label="Explain why you like Ember"
        @changeset={{this.changeset}} 
        @validationField="ember"
      />
  </demo.example>
  <demo.snippet @name="tpk-textarea-prefab.hbs"/>
</DocsDemo>

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.

## Optional properties

- `@label`: The label for the textarea field.
- `@placeholder`: The placeholder text for the textarea field.
- `@disabled`: Whether the input field is disabled.
- `@classless`: Whether to apply default classes to the component.
- `@onChange`: The action to be called when the selection changes. 
- `@changeEvent`: The event to trigger the onChange action.
- `@maxLength`: The maximum length of the textarea field.

## Examples

### Textarea with maxLength

<DocsDemo as |demo|>
  <demo.example @name="tpk-textarea-maxLenght-prefab.hbs">
      <Prefabs::TpkValidationTextarea
        @label="Explain why you like Ember"
        @changeset={{this.changeset}} 
        @validationField="ember"
        @maxLength={{100}}
      />
  </demo.example>
  <demo.snippet @name="tpk-textarea-maxLenght-prefab.hbs"/>
</DocsDemo>
