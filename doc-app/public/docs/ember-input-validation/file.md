# TpkValidationFile

A file input component with built-in validation support using changesets. This component wraps the `TpkFile` component and adds validation error handling.

## Basic Usage

<DocsDemo as |demo|>
  <demo.example @name="file-validation.hbs">
    <TpkValidationFile 
      @label="Upload your document"
      @changeset={{this.changeset}}
      @validationField="document"
      @onChange={{this.onChange}}
      @accept=".pdf,.doc,.docx"
    as |F|>
      <F.Label />
      <F.Input />
      <div>
        {{#each F.errors as |error|}}
          <span class="error-message">
            {{error.message}}
          </span>
        {{/each}}
      </div>
    </TpkValidationFile>
  </demo.example>
  <demo.snippet @name="file-validation.hbs"/>
</DocsDemo>

## Multiple File Upload

<DocsDemo as |demo|>
  <demo.example @name="file-validation-multiple.hbs">
    <TpkValidationFile 
      @label="Upload images"
      @changeset={{this.changeset}}
      @validationField="images"
      @multiple={{true}}
      @accept="image/*"
    as |F|>
      <F.Label />
      <F.Input />
      <div>
        {{#each F.errors as |error|}}
          <span class="error-message">
            {{error.message}}
          </span>
        {{/each}}
      </div>
    </TpkValidationFile>
  </demo.example>
  <demo.snippet @name="file-validation-multiple.hbs"/>
</DocsDemo>

## Arguments

### Required Arguments

**@label**: Label text for the file input.

**@changeset**: Changeset instance containing form data and validation.

**@validationField**: Name of the field in the changeset to bind to.

### Optional Arguments

**@onChange**: Function called when files are selected. Receives an array of `File` objects.

**@multiple**: Boolean. Enables multiple file selection. Default: `false`.

**@accept**: String specifying accepted file types (e.g., `"image/*"`, `".pdf,.doc"`).

**@classless**: Boolean. If `true`, removes default CSS classes.

**@disabled**: Boolean. If `true`, disables the file input.

**@changeEvent**: Event to trigger onChange - `"input"` or `"change"`. Default: `"change"`.

## Yielded Components

**F.Input**: File input component.

**F.Label**: Label component.

**F.errors**: Array of validation error objects for this field.

**F.hasError**: Boolean indicating if there are validation errors.

**F.firstError**: The first validation error object.

## Validation

The component automatically:
- Updates the changeset when files are selected
- Stores a single `File` object when `@multiple` is false
- Stores an array of `File` objects when `@multiple` is true
- Displays validation state via the `data-has-error` attribute

## CSS Classes

**.tpk-file**: Main container class.

**.tpk-file-input**: File input element class.

**.tpk-file-label**: Label element class.

**[data-has-error="false"]**: Applied when there are no validation errors.

**[data-has-error="true"]**: Applied when validation errors exist.
