# Input vat

This is an input with a built-in mask for VAT number.
Natively, it does supports belgium, french, luxembourgish, dutch and german VAT.

If the country is not supported, the input value will be blocked after 2 uppercase letters

<DocsDemo as |demo|>
  <demo.example @name="tpk-vat.hbs">
      <Prefabs::TpkValidationVat 
        @label="VAT"
        @placeholder="Enter vat"
        @changeset={{this.changeset}} 
        @validationField="vat"
      />
  </demo.example>
  <demo.snippet @name="tpk-vat.hbs"/>
</DocsDemo>

