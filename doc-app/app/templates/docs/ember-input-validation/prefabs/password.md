# Input password

This is a password input field.

<DocsDemo as |demo|>
  <demo.example @name="tpk-password.hbs">
      <Prefabs::TpkValidationPassword 
        @label="Password"
        @placeholder="Enter password"
        @changeset={{this.changeset}} 
        @validationField="name"
        @changeEvent="change"
        @disabled={{false}}
      />
  </demo.example>
  <demo.snippet @name="tpk-password.hbs"/>
</DocsDemo>

