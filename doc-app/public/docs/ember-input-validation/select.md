# TpkValidationSelect

A select dropdown component with built-in validation support using changesets. This component wraps the `TpkSelect` component and adds validation error handling.

## Basic Usage

<DocsDemo as |demo|>
  <demo.example @name="select-validation.hbs">
    <TpkValidationSelect 
      @label="Select your country"
      @changeset={{this.changeset}}
      @validationField="country"
      @options={{this.countries}}
      @selected={{this.selectedCountry}}
    as |S|>
      <S.Label />
      <S.Button>
        {{if S.hasSelection S.selected "Select..."}}
      </S.Button>
      <S.Options as |Option|>
        <Option as |opt|>
          {{opt.option}}
        </Option>
      </S.Options>
      <div>
        {{#each S.errors as |error|}}
          <span class="error-message">
            {{error.message}}
          </span>
        {{/each}}
      </div>
    </TpkValidationSelect>
  </demo.example>
  <demo.snippet @name="select-validation.hbs"/>
</DocsDemo>

## Multiple Selection

<DocsDemo as |demo|>
  <demo.example @name="select-validation-multiple.hbs">
    <TpkValidationSelect 
      @label="Select your interests"
      @changeset={{this.changeset}}
      @validationField="interests"
      @options={{this.interestOptions}}
      @selected={{this.selectedInterests}}
      @multiple={{true}}
    as |S|>
      <S.Label />
      <S.Button>
        {{if S.hasSelection S.selected "Select..."}}
      </S.Button>
      <S.Options as |Option|>
        <Option as |opt|>
          {{#if opt.isSelected}}✓{{/if}}
          {{opt.option}}
        </Option>
      </S.Options>
    </TpkValidationSelect>
  </demo.example>
  <demo.snippet @name="select-validation-multiple.hbs"/>
</DocsDemo>

## Arguments

### Required Arguments

**@label**: Label text for the select component.

**@changeset**: Changeset instance containing form data and validation.

**@validationField**: Name of the field in the changeset to bind to.

**@options**: Array of options to display in the dropdown.

### Optional Arguments

**@selected**: Currently selected value(s). Can be a single value or an array.

**@onChange**: Function called when selection changes. Receives `(newValue, wasAlreadySelected, event)`.

**@multiple**: Boolean. Enables multiple selection. Default: `false`.

**@classless**: Boolean. If `true`, removes default CSS classes.

**@disabled**: Boolean. If `true`, disables the select.

**@name**: Name attribute for the underlying select element.

**@changeEvent**: Event to trigger onChange - `"input"` or `"change"`.

## Yielded Components

**S.Label**: Label component for accessibility.

**S.Button**: Button that displays the current selection and toggles the dropdown.

**S.Options**: Options list container. Yields an option component that provides:
- **opt.option**: The option value
- **opt.isSelected**: Boolean indicating if this option is selected

**S.errors**: Array of validation error objects for this field.

**S.hasError**: Boolean indicating if there are validation errors.

**S.firstError**: The first validation error object.

**S.hasSelection**: Boolean indicating if a selection has been made.

## Keyboard Navigation

- **ArrowDown/ArrowUp**: Navigate through options
- **Enter/Space**: Open dropdown or select highlighted option
- **Escape**: Close the dropdown
- **Home/End**: Jump to first/last option
- **Type**: Quick search for options starting with typed characters

## CSS Classes

**.tpk-select**: Main container class.

**.tpk-select-label**: Label element class.

**.tpk-select-button**: Toggle button class.

**.tpk-select-options**: Options list class.

**.tpk-select-options-option**: Individual option class.

**[data-is-open="true"]**: Applied when dropdown is open.

**[data-has-focus="true"]**: Applied to the currently highlighted option.

**[data-has-error="false"]**: Applied when there are no validation errors.

**[data-has-error="true"]**: Applied when validation errors exist.
