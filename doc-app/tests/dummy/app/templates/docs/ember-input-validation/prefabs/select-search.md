# Select Search Component

This component provides a dropdown input field with a search capability and built-in validation. It allows users to select their favorite fast food from a list of options.

<DocsDemo as |demo|>
<demo.example @name="tpk-select-search.hbs">
<Prefabs::TpkValidationSelectSearch
@label="Select your favorite fastfood"
@changeset={{this.changeset}}
@onSearch={{this.search}}
@onChange={{this.onChange}}
@options={{this.options}}
@mandatory={{true}}
@disabled={{false}}
@validationField="fastfood"
/>
</demo.example>

<demo.snippet @name="tpk-select-search.hbs" />
</DocsDemo>

## Usage

The `TpkValidationSelectSearch` component is designed to integrate seamlessly into your forms, providing a searchable dropdown for selecting options with validation support.

### Properties

- `@label`: The label for the dropdown field (default: "Select your favorite fastfood")
- `@disabled`: Whether the input field is disabled (default: false)
- `@mandatory`: To indicate if input is mandatory (default: false)
- `@changeset`: The changeset object used for form validation.
- `@options`: The list of options available in the dropdown. Each options should have a toString() method

```ts
@tracked options = [
  {
    label: 'McDonald',
    value: 'Burger',
    other: 'Magie magie',
    toString() {
      return `${this.label} + ${this.other}`
    }
  }
]
```

- `@validationField`: The field name in the changeset for validation (default: "fastfood").

### Methods

- `@onChange`: A function that updates the changeset when a user selects an option.

```typescript
    @action
    onChange(v: { label: string, value: string }): void {
      this.changeset.set('fastfood', v.value);
    }
```

- `@onSearch`: A function that handles the search logic. It filters the list of options based on the user input.

```typescript
    @action
    onSearch(v: string): void {
      this.set(
        'options',
        this.options.filter((o) => o.label.includes(v)),
      );
    }
```
