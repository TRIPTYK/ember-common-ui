tpk-ember-select
==============================================================================

This addon will give you a simple select alternative in TailwindCSS


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above
* You need tailwind v2 or above to use this simple select


Installation
------------------------------------------------------------------------------

```zsh
ember install tpk-ember-select
```


Usage
------------------------------------------------------------------------------

Once the plugin is added you can simply add a select as shown.

The @options should be an array with this structure and the @updatedValue catch the selected item values
```js
options = [
    { id: 1, text: 'Monkey D. Luffy', value: 1 },
    { id: 1, text: 'Joe Boy', value: 2 },
    { id: 2, text: 'Gol D. Roger', value: 5678 },
  ];
```
#### Integration example 

Template .hbs
```hbs
<Ui::Select
  @label={{"Choose your captain"}}
  @options={{this.options}}
  @updateValue={{this.setValue}}
  @selectedValue={{this.value}}
  @placeholder="Select a value"
  @key="text"
  class="w-1/3"
/>
```

Controller .ts/.js
```js
@tracked value = '';

options = [
  { id: 1, text: 'Monkey D. Luffy', value: 1 },
  { id: 1, text: 'Joe Boy', value: 2 },
  { id: 2, text: 'Gol D. Roger', value: 5678 },
];
@action
setValue(value: any) {
  this.value = value.value;
}
```

#### CSS Classes

- Class for select : **.select**
- Class for label : **.label-select**
- Class for selected : **.selected**
- Class for button : **.btn-select**
- Class for select options : **.options-select**
- Class for select option : **.option-select**
- Class when option is selected : **.option-selected**
- Class when select is disabled(only on label) : **.disable**

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
