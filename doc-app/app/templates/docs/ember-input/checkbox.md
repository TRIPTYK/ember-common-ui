# Ember input/checkbox

A composable checkbox input element.

<DocsDemo as |demo|>
  <demo.example @name="tpk-checkbox.hbs">
      <TpkCheckbox
        @checked={{this.checked}}
        @onChange={{this.onChange}}
        @label="Checkbox"
      as |C|>
          <C.Label />
          <C.Input />
      </TpkCheckbox>
      <div>
        Checked: {{this.checked}}
      </div>
  </demo.example>
  <demo.snippet @name="tpk-checkbox.hbs"/>
</DocsDemo>

