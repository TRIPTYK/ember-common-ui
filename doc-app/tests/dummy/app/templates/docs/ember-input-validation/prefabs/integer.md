# Integer

the integer validation input prefab allows is used when we need an integer input.

it prevents decimal numbers by not allowing the comma and period.

<DocsDemo as |demo|>
  <demo.example @name="tpk-integer.hbs">
      <Prefabs::TpkValidationInteger
        @label="Amount"
        @placeholder="Enter an amount"
        @changeset={{this.changeset}} 
        @validationField="value"
        @changeEvent="change"
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-integer.hbs"/>
</DocsDemo>