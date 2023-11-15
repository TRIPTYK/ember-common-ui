# Ember input/select

An Ember input/select that performs an onChange task which allows it to display selection coming from select options.

## With base arguments
The following arguments are declared in the js controller paired with your hbs working file and given to the component by using the **@** (e.g. **@options**)

- **options**: A tracked value corresponding to the array of options of the select. Given value has to be an array of elements.

```js
@tracked sauceOptions = ["BBQ", "Ketchup", "Dallas"];
```
- **selected**: Allows your selected value to be displayed as the button label. By default if no value is selected, base value is displayed. Here base button value is "...".

```js
@tracked selection = '';
```

- **onChange**: Function that updates the value of `@tracked selection`. By updating the value, this now shows it as button label. This function receives value as an arguement.

```js
  @action
  onChange(value) {
    this.selection = value;
  }
```

- **label**: Corresponds to the title of the select.

<DocsDemo as |demo|>
  <demo.example @name="tpk-select.hbs">
      <TpkSelect
        @options={{this.sauceOptions}}
        @selected={{this.selection}}
        @onChange={{this.onChange}}
        @label="Select your favorite sauce:"
      as |S|>
        <S.Label />
          <S.Button>
            {{if S.hasSelection S.selected "..."}}
          </S.Button>
          <S.Options as |Opts|>
            <Opts as |opt|>
              {{opt.option}}
            </Opts>
          </S.Options>
      </TpkSelect>
  </demo.example>
  <demo.snippet @name="tpk-select.hbs"/>
</DocsDemo>

## With optional arguments added

- **multiple**: Boolean information that allows you to select several options. In this case the multiple selected values will be pushed in an array (e.g. `@tracked valueCar = []`).

Keeping the same process as explained before the values will be displayed as button label using `@selected={{this.valueCar}}`.


<DocsDemo as |demo|>
  <demo.example @name="tpk-select-car.hbs">
      <TpkSelect
        @options={{this.carOptions}}
        @selected={{this.valueCar}}
        @multiple={{this.multiple}}
        @classless={{this.classless}}
        @onChange={{this.onChangeCar}}
        @label="Select your favorite(s) car brand: "
      as |S|>
        <S.Label />
          <S.Button>
            {{if S.hasSelection S.selected "..."}}
          </S.Button>
          <S.Options as |Opts|>
            <Opts as |opt|>
              {{#if opt.selected}}
                ok
              {{/if}}
              {{opt.option}}
            </Opts>
          </S.Options>
      </TpkSelect>
  </demo.example>
  <demo.snippet @name="tpk-select-car.hbs"/>
</DocsDemo>


