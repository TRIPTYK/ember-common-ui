# Input password

This is an input with a built-in mask for IBAN.
Natively, it does supports belgium, french, luxembourgish, dutch and german IBAN.
The value is formated so that there 4 character then a space up to the end of the IBAN.

<DocsDemo as |demo|>
  <demo.example @name="tpk-iban.hbs">
      <Prefabs::TpkValidationIban 
        @label="IBAN"
        @placeholder="Enter iban"
        @changeset={{this.changeset}} 
        @validationField="iban"
        @changeEvent="change"
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-iban.hbs"/>
</DocsDemo>

