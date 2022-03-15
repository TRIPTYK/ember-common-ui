tpk-ember-select
==============================================================================

This addon will give you a simple textarea alternative in TailwindCSS


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
* You need tailwind v2 or above to use this simple textarea


Installation
------------------------------------------------------------------------------

```zsh
ember install @triptyk/tpk-ember-textarea
```
OR
```zsh
pnpm add -D @triptyk/tpk-ember-textarea
```


Usage
------------------------------------------------------------------------------
#### Features

- Limit of characters
- Add class error trigger when @hasError is true and you can add a **yield** with the error
- A info tooltip under the textarea with @infoTooltip

#### Integration example 

Template .hbs
```hbs
<Ui::Textarea
  @label="Add your favorite JS framework"
  @value={{this.value}}
  @containerStyle=""
  @labelStyle=""
  @textareaStyle=""
  @col=""
  @row=""
  @limitStyle=""
  @tooltipStyle=""
  @mandatory={{true}}
  @infoTooltip="A good info"
  @hasError={{true}}
  @updateValue={{this.setValue}}
  @selectedValue={{this.value}}
  @placeholder="Select a value"
  @key="text"
  type="nothing | text | date | string | password"
  {{on "focus" this.focusOtherTextarea}}
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
