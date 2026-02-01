# Ember input/input

A composable html input element.


<DocsDemo as |demo|>
  <demo.example @name="tpk-input.hbs">
      <TpkInput @changeEvent='input' @value={{this.value}} @onChange={{this.onChange}} @label="Name on input" as |I|>
          <I.Label />
          <I.Input />
      </TpkInput>
      <TpkInput @changeEvent='change' @value={{this.value}} @onChange={{this.onChange}} @label="Name on change" as |I|>
          <I.Label />
          <I.Input />
      </TpkInput>

      <div>
        Value: {{this.value}}
      </div>
  </demo.example>
  <demo.snippet @name="tpk-input.hbs"/>
</DocsDemo>

