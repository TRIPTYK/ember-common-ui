# Currency

The currency validation prefab is used to validate currency input fields. 

It is provided with a mask to format the input field as currency.

The only supported format is euro at the moment.

<DocsDemo as |demo|>
  <demo.example @name="tpk-currency.hbs">
      <Prefabs::TpkValidationCurrency
        @label="Amount"
        @placeholder="Enter an amount"
        @changeset={{this.changeset}} 
        @validationField="value"
        @changeEvent="change"
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-currency.hbs"/>
</DocsDemo>

