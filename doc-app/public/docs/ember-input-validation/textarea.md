# TpkValidationTextarea

A textarea component with built-in validation support using changesets. This component wraps the `TpkTextarea` component and adds validation error handling.

## Basic Usage

<DocsDemo as |demo|>
<demo.example @name="textarea-validation.hbs">
<TpkValidationTextarea
@label="Description"
@changeset={{this.changeset}}
@validationField="description"
@maxLength={{500}}
as |T|>

<div>
<T.Label />
<span class="char-count">
{{T.charCount}} / {{T.maxLength}}
</span>
</div>
<T.Input />
<div>
{{#each T.errors as |error|}}
<span class="error-message">
{{error.message}}
</span>
{{/each}}
</div>
</TpkValidationTextarea>
</demo.example>
<demo.snippet @name="textarea-validation.hbs"/>
</DocsDemo>

## Arguments

### Required Arguments

**@label**: Label text for the textarea.

**@changeset**: Changeset instance containing form data and validation.

**@validationField**: Name of the field in the changeset to bind to.

### Optional Arguments

**@onChange**: Function called when the textarea value changes. Receives `(newValue, event)`.

**@maxLength**: Maximum number of characters allowed.

**@classless**: Boolean. If `true`, removes default CSS classes.

**@disabled**: Boolean. If `true`, disables the textarea.

**@changeEvent**: Event to trigger onChange - `"input"` or `"change"`. Default: `"input"`.

**@placeholder**: Placeholder text for the textarea.

**@rows**: Number of visible text rows. Default: varies by browser.

**@cols**: Number of visible text columns. Default: varies by browser.

## Yielded Components

**T.Input**: Textarea input component.

**T.Label**: Label component.

**T.charCount**: Current number of characters in the textarea.

**T.maxLength**: Maximum allowed characters (from `@maxLength`).

**T.errors**: Array of validation error objects for this field.

**T.hasError**: Boolean indicating if there are validation errors.

**T.firstError**: The first validation error object.

## Validation

The component automatically:

- Updates the changeset as the user types (or on change, depending on `@changeEvent`)
- Displays validation state via the `data-has-error` attribute
- Enforces `@maxLength` if specified
- Provides character count for user feedback

## CSS Classes

**.tpk-textarea**: Main container class.

**.tpk-textarea-label**: Label element class.

**.tpk-textarea-input**: Textarea element class.

**[data-has-error="false"]**: Applied when there are no validation errors.

**[data-has-error="true"]**: Applied when validation errors exist.
