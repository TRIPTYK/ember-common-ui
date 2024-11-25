# Input

This component provides an input.

<DocsDemo as |demo|>
  <demo.example @name="tpk-input-prefab.hbs">
      <Prefabs::TpkValidationInput
        @label="Tell me something"
        @changeset={{this.changeset}} 
        @validationField="something"
      />
  </demo.example>
  <demo.snippet @name="tpk-input-prefab.hbs"/>
</DocsDemo>

## Usage

The `TpkValidationInput` component is used for a simple input. If you want use an integer input, use `TpkValidationInteger`.

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.

## Optional properties

- `@label`: The label for the input field.
- `@placeholder`: The placeholder text for the input field.
- `@type`: The type of the input field. Defaults to 'text'.
- `@mandatory`: Whether the textarea field is mandatory.
- `@mask`: The mask to apply to the input field.
- `@maskOptions`: The options to apply to the mask.
- `@unmaskValue`: Whether to unmask the value before setting it in the changeset.
- `@disabled`: Whether the input field is disabled.
- `@onChange`: The action to be called when the selection changes. 
- `@changeEvent`: The event to trigger the onChange action.

