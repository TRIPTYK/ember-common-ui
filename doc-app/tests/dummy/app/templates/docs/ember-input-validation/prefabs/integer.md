# Integer

the integer validation input prefab allows is used when we need an integer input.

it prevents decimal numbers by not allowing the comma and period.

the integer validation input can be blocked at a minimum of 0 or be a negative number

<DocsDemo as |demo|>
  <demo.example @name="tpk-integer.hbs">
      <Prefabs::TpkValidationInteger
        @label="Unsigned Integer"
        @placeholder="Enter an number"
        @changeset={{this.changeset}} 
        @validationField="uInteger"
        @changeEvent="change"
        @onChange={{this.onChangeUInteger}}
        @disabled={{false}}
        @mandatory={{true}}
        @unsigned={{true}}
      />

      <Prefabs::TpkValidationInteger
        @label="Integer"
        @placeholder="Enter an number"
        @changeset={{this.changeset}} 
        @validationField="integer"
        @changeEvent="change"
        @onChange={{this.onChangeInteger}}
        @disabled={{false}}
        @mandatory={{true}}
      />
  </demo.example>
  <demo.snippet @name="tpk-integer.hbs"/>
</DocsDemo>