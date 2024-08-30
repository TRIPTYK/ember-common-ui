# Input Email

This is an input with type Email

<DocsDemo as |demo|>
  <demo.example @name="tpk-email.hbs">
      <Prefabs::TpkValidationEmail 
        @label="EMAIL"
        @placeholder="Enter Email"
        @changeset={{this.changeset}} 
        @validationField="email"
        @changeEvent="change"
        @disabled={{false}}
        @mandatory={{true}}
      />    
  </demo.example>
  <demo.snippet @name="tpk-email.hbs"/>
</DocsDemo>

