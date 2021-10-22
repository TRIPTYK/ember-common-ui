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
        { id:1,text: "stephane meermans", value: 1 }, 
        {id:2, text: "gilles Bertrand", value: 5678}
];
```
#### Integration example 

Template .hbs
```hbs
<Ui::Select class="w-1/3" @label={{"Assigned to"}} @options={{this.options}} @updateValue={{this.setValue}} />
```

Controller .ts/.js
```js
@tracked value = '';
  
    options = [{ id:1,text: "stephane meermans", value: 1 }, {id:2,
      text: "gilles Bertrand",
      value: 5678,
    }];
    @action
    setValue(value:any){
      console.log('update value', value)
      this.value= value;
    }
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
