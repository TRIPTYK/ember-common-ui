# Number

The number validation input can be blocked at a minimum of 0 or be a negative number

<DocsDemo as |demo|>
  <demo.example @name="tpk-number.hbs">
      <Prefabs::TpkValidationNumber
        @label="Unsigned Number"
        @placeholder="Enter an number"
        @changeset={{this.changeset}} 
        @validationField="uNumber"
        @changeEvent="change"
        @onChange={{this.onChangeUNumber}}
        @disabled={{false}}
        @mandatory={{true}}
        @unsigned={{true}}
      />
      <Prefabs::TpkValidationNumber
        @label="Number"
        @placeholder="Enter an number"
        @changeset={{this.changeset}} 
        @validationField="number"
        @changeEvent="change"
        @onChange={{this.onChangeNumber}}
        @disabled={{false}}
        @mandatory={{true}}
      />
      <Prefabs::TpkValidationNumber
        @label="Disabled number"
        @disabled={{true}}
        @placeholder="Enter an number"
        @changeset={{this.changeset}} 
        @validationField="number"
        @changeEvent="change"
        @onChange={{this.onChangeNumber}}
        @disabled={{false}}
        @mandatory={{true}}
      />
      <Prefabs::TpkValidationNumber
        @label="Number with errors"
        @placeholder="Enter an number"
        @changeset={{this.changesetWithErrors}} 
        @validationField="number"
        @changeEvent="change"
        @onChange={{this.onChangeNumber}}
        @disabled={{false}}
        @mandatory={{true}}
      />
  </demo.example>
  <demo.snippet @name="tpk-number.hbs"/>
</DocsDemo>
