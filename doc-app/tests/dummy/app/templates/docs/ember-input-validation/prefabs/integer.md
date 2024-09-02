# Integer

the integer validation input prefab allows is used when we need an integer input.

it prevents decimal numbers by not allowing the comma and period.

<DocsDemo as |demo|>
  <demo.example @name="tpk-integer.hbs">
      <Prefabs::TpkValidationInteger
        @label="Integer"
        @placeholder="Enter an number"
        @changeset={{this.changeset}} 
        @validationField="integer"
        @changeEvent="change"
        @onChange={{this.onChange}}
        @disabled={{false}}
        @mandatory={{true}}
      />
  </demo.example>
  <demo.snippet @name="tpk-integer.hbs"/>
</DocsDemo>