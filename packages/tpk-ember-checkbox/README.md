tpk-ember-checkbox
==============================================================================

This addon will give you a simple checkbox alternative in TailwindCSS


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
* You need tailwind v2 or above to use this simple checkbox


Installation
------------------------------------------------------------------------------

```zsh
ember install @triptyk/tpk-ember-checkbox
```
OR
```zsh
pnpm add -D @triptyk/tpk-ember-checkbox
```


Usage
------------------------------------------------------------------------------

#### Integration example 

Template .hbs
```hbs
<Ui::Checkbox
  @label="RGPD ?"
  @checked={{this.checked}}
  @updateValue={{this.setValue}}
  @value={{this.value}}
  @name="rgpd"
  @imageUrl='/assets/icons/check.svg'
  @containerStyle=""
  @checkboxStyle=""
  @labelStyle=""
/>
```

Controller .ts/.js
```js
@tracked value = '';

@tracked checked: boolean = false;
value: string = 'rgpd';

@action
setChecked(checked: boolean) {
  this.checked = checked;
}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
