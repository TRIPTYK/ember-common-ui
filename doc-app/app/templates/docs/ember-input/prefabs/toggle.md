# Toggle

A toggle switch. This is a simple wrapper around the `input` element with `type="checkbox"`.

<DocsDemo as |demo|>
  <demo.example @name="tpk-toggle.hbs">
      <Prefabs::TpkToggle @checked={{true}} @label="Toggle Input" />
      <Prefabs::TpkToggle @checked={{true}} @disabled={{true}} @label="Toggle Disabled" />
  </demo.example>
  <demo.snippet @name="tpk-toggle.hbs"/>
</DocsDemo>

