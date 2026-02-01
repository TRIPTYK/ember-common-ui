# Input Email

This is an input with type Email

<DocsDemo as |demo|>
  <demo.example @name="tpk-email.hbs">
      <Prefabs::TpkValidationEmail 
        @label="EMAIL"
        @placeholder="Enter Email"
        @changeset={{this.changeset}} 
        @validationField="email"
        @mandatory=true
      />    
      <Prefabs::TpkValidationEmail 
        @label="Disabled"
        @changeset={{this.changeset}} 
        @validationField="disabled"
        @disabled=true
      />    
      <Prefabs::TpkValidationEmail 
        @label="Error"
        @changeset={{this.changeset}} 
        @validationField="error"
      />    
  </demo.example>
  <demo.snippet @name="tpk-email.hbs"/>
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