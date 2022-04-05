ember-select
==============================================================================

This addon will give you a simple input alternative in TailwindCSS


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
* You need tailwind v2 or above to use this simple input


Installation
------------------------------------------------------------------------------

```zsh
ember install @triptyk/ember-input-validation
```
OR
```zsh
pnpm add -D @triptyk/ember-input-validation
```


### Common arguments

All the inputs in this addon accepts these arguments.


```ts
interface TpkBaseValidationArgs {
  classless?: boolean;
  label?: string;
  changeset: BufferedChangeset;
  validationField: string;
  value: unknown;
  changeEvent: 'input' | 'change';
  onChange?: (...args: unknown[]) => unknown;
}
```

## Template usage

Same as https://github.com/TRIPTYK/ember-common-ui/blob/main/packages/ember-input/README.md

In addition, all root components yields
  - `hasError` : boolean - check if has errros in changeset
  - `errors` : array - The validation errors
  - `firstError` : object - The first validation error

Every root component has also an HTML attribute 
  - `data-has-error='{{this.hasError}}'`

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
