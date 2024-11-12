# Input iban

This is an input with a built-in mask for BIC.
The mask should be compatible for any BIC


<DocsDemo as |demo|>
  <demo.example @name="tpk-bic.hbs">
      <Prefabs::TpkValidationBic 
        @label="BIC"
        @placeholder="Enter bic"
        @changeset={{this.changeset}} 
        @validationField="bic"
      />
  </demo.example>
  <demo.snippet @name="tpk-bic.hbs"/>
</DocsDemo>

