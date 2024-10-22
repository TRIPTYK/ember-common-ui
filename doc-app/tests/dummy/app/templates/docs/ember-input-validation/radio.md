# Ember input validation/radio

Ember input validation/radio content

<DocsDemo as |demo|>
  <demo.example @name="radio-validation-src.hbs">
  {{#each this.values as |value|}}
    <TpkValidationRadio 
      @changeset={{this.changeset}}
      @validationField="radio"
      @label={{value.label}}
      @value={{value.value}}
      as |T|>

      <T.Input />
      <T.Label /> 
    
    </TpkValidationRadio>
  {{/each}}
 
  Result: {{changeset-get this.changeset 'radio'}}

  </demo.example>
  <demo.snippet @name="radio-validation-src.hbs"/>
</DocsDemo>