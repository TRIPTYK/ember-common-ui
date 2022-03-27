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


Usage
------------------------------------------------------------------------------
#### Features

- Limit of characters
- Password show or hide. You should add
```html
type="password"
```
- Add class error trigger when @hasError is true and you can add a **yield** with the error
- A info tooltip under the input with @infoTooltip
- When @mandatory is {{true}}, it's adding this :
```html
<span class='mandatory'>*</span>
```
After the label
#### Integration example 

Template .hbs
```hbs
<Tpk:Input
  @label="Add your favorite JS framework"
  @value={{this.value}}
  @containerStyle=""
  @labelStyle=""
  @inputStyle=""
  @passwordStyle=""
  @limitStyle=""
  @tooltipStyle=""
  @password={{true}}
  @mandatory={{true}}
  @infoTooltip="A good info"
  @hasError={{true}}
  @updateValue={{this.setValue}}
  @selectedValue={{this.value}}
  @placeholder="Select a value"
  @key="text"
  type="nothing | text | date | string | password"
  {{on "focus" this.focusOtherInput}}
/>
```

Controller .ts/.js
```js
@tracked value = '';

@action
setValue(value: string | number) {
  this.value = value;
}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).