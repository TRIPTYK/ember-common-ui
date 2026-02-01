# Input national number

This is an input with a built-in mask for a belgian national number.
It makes so that the national number is written in a pretty format similar
to the one on your belgian ID.


<DocsDemo as |demo|>
  <demo.example @name="tpk-national-number.hbs">
      <Prefabs::TpkValidationNationalNumber 
        @label="National number"
        @placeholder="Enter belgian national number"
        @changeset={{this.changeset}} 
        @validationField="nationalNumber"
      />
      <Prefabs::TpkValidationNationalNumber 
        @label="Disabled National number"
        @placeholder="Enter belgian national number"
        @disabled={{true}}
        @changeset={{this.changeset}} 
        @validationField="nationalNumber"
      />
      <Prefabs::TpkValidationNationalNumber 
        @label="Error National number"
        @placeholder="Enter belgian national number"
        @changeset={{this.changesetWithErrors}} 
        @validationField="nationalNumber"
      />
  </demo.example>
  <demo.snippet @name="tpk-national-number.hbs"/>
</DocsDemo>

