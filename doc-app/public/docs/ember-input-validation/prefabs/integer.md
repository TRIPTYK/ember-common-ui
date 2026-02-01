# Integer

The integer validation input prefab is used when an integer input is required.

It prevents decimal numbers by disallowing the comma and period.

The integer validation input can be restricted to a minimum of 0 or allow negative numbers.

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
        @label="Disabled Integer"
        @placeholder="Enter an number"
        @changeset={{this.changeset}} 
        @validationField="integer"
        @changeEvent="change"
        @onChange={{this.onChangeInteger}}
        @disabled={{true}}
        @mandatory={{true}}
      />
      <Prefabs::TpkValidationBic
        @label="Invalid Integer"
        @placeholder="Enter an number"
        @changeset={{this.changesetWithErrors}} 
        @validationField="integer"
        @changeEvent="change"
        @onChange={{this.onChangeInteger}}
        @disabled={{false}}
        @mandatory={{true}}
      />
  </demo.example>
  <demo.snippet @name="tpk-integer.hbs"/>
</DocsDemo>

