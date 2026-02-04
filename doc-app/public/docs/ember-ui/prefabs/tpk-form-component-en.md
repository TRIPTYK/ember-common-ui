# TpkForm Component

A comprehensive form component that integrates validation using `ember-immer-changeset` and `zod`. The component provides automatic validation, error handling, and yields pre-configured validation input components.

<DocsDemo as |demo|>
<demo.example @name="tpk-form-basic-example.hbs">
<TpkForm
@changeset={{this.changeset}}
@onSubmit={{this.handleSubmit}}
@validationSchema={{this.validationSchema}}
as |F|

> <F.TpkInputPrefab

    @label="First Name"
    @validationField="firstName"

/>

<F.TpkInputPrefab
@label="Last Name"
@validationField="lastName"
/>

<F.TpkEmailPrefab
@label="Email"
@validationField="email"
/>

<button class="button" type="submit">Submit</button>
</TpkForm>
</demo.example>
<demo.snippet @name="tpk-form-basic-example.hbs"/>
</DocsDemo>

## Mandatory properties

- `@changeset`: An instance of [ImmerChangeset](https://triptyk.github.io/ember-immer-changeset/classes/ImmerChangeset.html) containing the form data. This changeset manages the form state and validation errors.
- `@onSubmit`: A callback function executed when the form is submitted with valid data. Receives two parameters: `(data, changeset)` where data is the validated object and changeset is the ImmerChangeset instance.
- `@validationSchema`: A Zod schema (ZodObject) that defines the validation rules for the form fields.

## Optional properties

- `@reactive` (Boolean, default: `true`): When enabled, validates individual fields immediately when their values change. Set to `false` to validate only on form submission.
- `@removeErrorsOnSubmit` (Boolean, default: `true`): Clears all existing validation errors before performing validation on submit.
- `@autoScrollOnError` (Boolean, default: `true`): Automatically scrolls to the first validation error when submission fails.
- `@disabled` (Boolean, default: `false`): Disables all form inputs when set to `true`.
- `@executeOnValid` (Boolean, default: `true`): Automatically executes the changeset (applies draft changes to data) when validation passes.

## Implementation Guide

### 1. Controller/Component Setup

Create a changeset, validation schema, and submit handler:

```typescript
import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, email } from 'zod';
import { action } from '@ember/object';

export default class MyFormController extends Controller {
  // Initialize an empty changeset
  changeset = new ImmerChangeset({
    firstName: '',
    lastName: '',
    email: '',
  });

  // Define validation rules with Zod
  validationSchema = object({
    firstName: string().min(2, 'First name must be at least 2 characters'),
    lastName: string().min(2, 'Last name must be at least 2 characters'),
    email: string().email('Must be a valid email address'),
  });

  @action
  handleSubmit(validatedData, changeset) {
    // validatedData contains the validated form data
    // changeset is the ImmerChangeset instance
    console.log('Form submitted with:', validatedData);
    // Perform your API call or data processing here
  }
}
```

### 2. Using the TpkForm Component

The form yields a hash of pre-configured validation components:

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  as |F|
>
  {{! Use yielded prefab components }}
  <F.TpkInputPrefab
    @label="First Name"
    @validationField="firstName"
  />

  <F.TpkInputPrefab
    @label="Last Name"
    @validationField="lastName"
  />

  <F.TpkEmailPrefab
    @label="Email Address"
    @validationField="email"
  />

  <button type="submit">Submit</button>
</TpkForm>
```

### 3. Available Yielded Components

The `TpkForm` component yields numerous pre-configured components, all automatically bound with the changeset, disabled state, and required fields:

#### Base Components (for custom layouts)

- `F.TpkInput` - Base input component
- `F.TpkTextarea` - Base textarea component
- `F.TpkSelect` - Base select component
- `F.TpkCheckbox` - Base checkbox component
- `F.TpkRadio` - Base radio component
- `F.TpkRadioGroup` - Radio group component
- `F.TpkFile` - Base file input component
- `F.TpkDatepicker` - Base datepicker component

#### Prefab Components (ready-to-use)

- `F.TpkInputPrefab` - Standard text input
- `F.TpkTextareaPrefab` - Textarea with validation
- `F.TpkSelectPrefab` - Select dropdown
- `F.TpkSelectCreatePrefab` - Select with create option
- `F.TpkSelectSearchPrefab` - Searchable select
- `F.TpkCheckboxPrefab` - Checkbox with label
- `F.TpkRadioPrefab` - Single radio button
- `F.TpkRadioGroupPrefab` - Radio button group
- `F.TpkFilePrefab` - File upload input

#### Specialized Input Prefabs

- `F.TpkPasswordPrefab` - Password input with visibility toggle
- `F.TpkEmailPrefab` - Email input with validation
- `F.TpkMobilePrefab` - Mobile phone number input
- `F.TpkIbanPrefab` - IBAN (bank account) input
- `F.TpkBicPrefab` - BIC/SWIFT code input
- `F.TpkVatPrefab` - VAT number input
- `F.TpkNationalNumberPrefab` - National identification number
- `F.TpkCurrencyPrefab` - Currency/money input
- `F.TpkIntegerPrefab` - Integer number input
- `F.TpkNumberPrefab` - Decimal number input

#### Date/Time Prefabs

- `F.TpkDatepickerPrefab` - Single date picker
- `F.TpkDatepickerRangePrefab` - Date range picker
- `F.TpkTimepickerPrefab` - Time picker

#### Yielded Helper Values

- `F.changesetGet` - Function to retrieve values from the changeset (shortcut for `changeset.get()`)
- `F.requiredFields` - Array of field names that are required according to the validation schema

### 4. Using Base Components for Custom Layouts

Base components give you full control over the markup:

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  as |F|
>
  <F.TpkInput
    @label="Username"
    @validationField="username"
    as |I|
  >
    <I.Label />
    <I.Input />
    {{#if I.errors}}
      <div class="error-messages">
        {{#each I.errors as |error|}}
          <p class="error">{{error.message}}</p>
        {{/each}}
      </div>
    {{/if}}
  </F.TpkInput>

  <button type="submit">Submit</button>
</TpkForm>
```

### 5. Validation Behavior

#### Reactive Validation (Default)

When `@reactive={{true}}` (default), fields are validated as soon as their values change:

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  @reactive={{true}}
  as |F|
>
  {{! Field validates on every change }}
  <F.TpkInputPrefab @label="Email" @validationField="email" />
</TpkForm>
```

#### Submit-Only Validation

Set `@reactive={{false}}` to validate only when the form is submitted:

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  @reactive={{false}}
  as |F|
>
  {{! Field validates only on submit }}
  <F.TpkInputPrefab @label="Email" @validationField="email" />
</TpkForm>
```

### 6. Error Handling and Auto-Scrolling

Control error clearing and auto-scroll behavior:

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  @removeErrorsOnSubmit={{true}}
  @autoScrollOnError={{true}}
  as |F|
>
  {{! Errors cleared before validation, scrolls to first error }}
  <F.TpkInputPrefab @label="Field 1" @validationField="field1" />
  <F.TpkInputPrefab @label="Field 2" @validationField="field2" />
</TpkForm>
```

### 7. Disabled State

Disable the entire form and all its inputs:

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  @disabled={{this.isLoading}}
  as |F|
>
  {{! All inputs will be disabled when isLoading is true }}
  <F.TpkInputPrefab @label="Name" @validationField="name" />
</TpkForm>
```

### 8. Working with Required Fields

Access the list of required fields from the validation schema:

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  as |F|
>
  <p>Required fields: {{F.requiredFields.length}}</p>

  <F.TpkInputPrefab @label="Name" @validationField="name" />

  {{#if (includes F.requiredFields "email")}}
    <p class="hint">Email is required</p>
  {{/if}}
  <F.TpkEmailPrefab @label="Email" @validationField="email" />
</TpkForm>
```

### 9. changesetGet Helper

Use the `changesetGet` helper to retrieve values without repeating the `@changeset` argument:

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  as |F|
>
  <F.TpkInputPrefab @label="First Name" @validationField="firstName" />
  <F.TpkInputPrefab @label="Last Name" @validationField="lastName" />

  <p>Full name: {{F.changesetGet "firstName"}} {{F.changesetGet "lastName"}}</p>
</TpkForm>
```

### 10. Complex Form Example

```typescript
// Controller
import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, number, boolean, date } from 'zod';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ComplexFormController extends Controller {
  @tracked isSubmitting = false;

  changeset = new ImmerChangeset({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: null,
    country: null,
    subscribe: false,
  });

  validationSchema = object({
    firstName: string().min(2),
    lastName: string().min(2),
    email: string().email(),
    phone: string().optional(),
    birthday: date(),
    country: string().min(2),
    subscribe: boolean(),
  });

  countryOptions = [
    { label: 'Belgium', value: 'BE' },
    { label: 'France', value: 'FR' },
    { label: 'Netherlands', value: 'NL' },
  ];

  @action
  async handleSubmit(validatedData, changeset) {
    this.isSubmitting = true;
    try {
      await this.saveUser(validatedData);
      alert('User saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      this.isSubmitting = false;
    }
  }
}
```

```gts
{{! Template }}
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  @disabled={{this.isSubmitting}}
  class="user-form"
  as |F|
>
  <div class="form-row">
    <F.TpkInputPrefab
      @label="First Name"
      @validationField="firstName"
    />
    <F.TpkInputPrefab
      @label="Last Name"
      @validationField="lastName"
    />
  </div>

  <F.TpkEmailPrefab
    @label="Email Address"
    @validationField="email"
  />

  <F.TpkMobilePrefab
    @label="Phone Number"
    @validationField="phone"
  />

  <F.TpkDatepickerPrefab
    @label="Date of Birth"
    @validationField="birthday"
  />

  <F.TpkSelectPrefab
    @label="Country"
    @validationField="country"
    @options={{this.countryOptions}}
  />

  <F.TpkCheckboxPrefab
    @label="Subscribe to newsletter"
    @validationField="subscribe"
  />

  <button
    type="submit"
    class="button primary"
    disabled={{this.isSubmitting}}
  >
    {{if this.isSubmitting "Saving..." "Save User"}}
  </button>
</TpkForm>
```

## Customizing Default Components

The default yielded components are the standard validation components (`TpkValidation*`), but you can change these default components by modifying the values in the TpkForm service.

```typescript
let tpkFormService = this.owner.lookup('service:tpk-form') as TpkFormService;

// Base Components
tpkFormService.TpkInput = CustomInput;
tpkFormService.TpkTextarea = CustomTextarea;
tpkFormService.TpkSelect = CustomSelect;
tpkFormService.TpkCheckbox = CustomCheckbox;
tpkFormService.TpkRadio = CustomRadio;
tpkFormService.TpkRadioGroup = CustomRadioGroup;
tpkFormService.TpkFile = CustomFile;
tpkFormService.TpkDatepicker = CustomDatepicker;

// Prefab Components
tpkFormService.TpkInputPrefab = CustomInputPrefab;
tpkFormService.TpkTextareaPrefab = CustomTextareaPrefab;
tpkFormService.TpkSelectPrefab = CustomSelectPrefab;
tpkFormService.TpkSelectCreatePrefab = CustomSelectCreatePrefab;
tpkFormService.TpkSelectSearchPrefab = CustomSelectSearchPrefab;
tpkFormService.TpkCheckboxPrefab = CustomCheckboxPrefab;
tpkFormService.TpkRadioPrefab = CustomRadioPrefab;
tpkFormService.TpkRadioGroupPrefab = CustomRadioGroupPrefab;
tpkFormService.TpkDatepickerPrefab = CustomDatepickerPrefab;
tpkFormService.TpkDatepickerRangePrefab = CustomDatepickerRangePrefab;
tpkFormService.TpkTimepickerPrefab = CustomTimepickerPrefab;

// Specialized Input Prefabs
tpkFormService.TpkPasswordPrefab = CustomPasswordPrefab;
tpkFormService.TpkEmailPrefab = CustomEmailPrefab;
tpkFormService.TpkIbanPrefab = CustomIbanPrefab;
tpkFormService.TpkBicPrefab = CustomBicPrefab;
tpkFormService.TpkVatPrefab = CustomVatPrefab;
tpkFormService.TpkNationalNumberPrefab = CustomNationalNumberPrefab;
tpkFormService.TpkCurrencyPrefab = CustomCurrencyPrefab;
tpkFormService.TpkIntegerPrefab = CustomIntegerPrefab;
tpkFormService.TpkNumberPrefab = CustomNumberPrefab;
tpkFormService.TpkMobilePrefab = CustomMobilePrefab;
tpkFormService.TpkFilePrefab = CustomFilePrefab;
```

This customization allows you to replace the default components with your own implementations while maintaining the form's structure and behavior.

## Key Features

1. **Automatic Validation**: Seamlessly integrates with Zod schemas for comprehensive validation rules.
2. **Error Management**: Automatically displays validation errors and clears them as needed.
3. **Changeset Integration**: Uses `ember-immer-changeset` for efficient state management and change tracking.
4. **Rich Component Library**: Provides 30+ pre-configured input components for common use cases.
5. **Flexible Validation**: Supports both reactive (on-change) and submit-only validation modes.
6. **Accessibility**: Auto-scrolls to errors and properly manages focus states.
7. **Type Safety**: Full TypeScript support with generic type parameters for schema inference.
8. **Customizable**: Can override default components via the TpkForm service.

## Important Notes

- The `@onSubmit` callback is only executed when the form is valid.
- By default, the changeset is automatically executed (changes applied) before calling `@onSubmit`. Set `@executeOnValid={{false}}` to prevent this.
- All yielded components are pre-bound with the changeset, disabled state, and required fields list.
- The validation schema must use Zod (not Yup, which was used in older versions).
- Field names in the validation schema must match the `@validationField` values used in the form inputs.
- The component automatically handles calculating required fields based on the Zod schema and updates the list when data changes.
