tpk-ember-select
==============================================================================

This addon will give you a simple select alternative for TailwindCSS


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
* You need tailwind v2 or above to use this simple select


Installation
------------------------------------------------------------------------------

```zsh
ember install @triptyk/tpk-ember-select
```
OR
```zsh
pnpm add -D @triptyk/tpk-ember-select
```


Usage
------------------------------------------------------------------------------

### Default style

```css
@import 'tpk-ember-select';
```

### Simple syntax

```hbs
<TpkSelect 
  @multiple={{true}} 
  @options={{this.options}} 
  @selected={{this.selected}} 
  @onSelect={{this.selectElement}} 
  @onSearch={{this.search}}
  @label="My select"
  @defaultText="Please select something"
>
  <:selected as |s|>
    <span class="text-red-400">{{s}}</span>
  </:selected>
  <:option as |o|>
    {{o.option}}
  </:option>
</TpkSelect>
```

### Extended syntax

```
  
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
