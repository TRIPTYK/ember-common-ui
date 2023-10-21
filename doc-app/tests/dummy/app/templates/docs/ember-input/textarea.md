# Ember input/textarea

A composable checkbox input element.

<DocsDemo as |demo|>
  <demo.example @name="tpk-Textarea.hbs">
      <TpkTextarea
        @value={{this.value}}
        @onChange={{this.onChange}}
        @maxLength={{10}}
        @changeEvent='change'
        @label="Textarea"
      as |C|>
          <C.Label />
          <C.Input />
          {{C.charCount}} / {{C.maxLength}}
      </TpkTextarea>
      <div>
        Content: {{this.value}}
      </div>
  </demo.example>
  <demo.snippet @name="tpk-Textarea.hbs"/>
</DocsDemo>

