# Button

A button. This is a simple wrapper around the `input` element with `type="button"`.

<DocsDemo as |demo|>
  <demo.example @name="tpk-button.hbs">
    <div class="pb-4">
      <Prefabs::TpkPrefabButton @onClick={{this.incrementCounter}} @label="Button Enabled" />
      <Prefabs::TpkPrefabButton @onClick={{this.incrementCounter}} @disabled=true @label="Button Disabled" />
      </div>
      <p>count = {{this.counter}}</p>
  </demo.example>
  <demo.snippet @name="tpk-button.hbs"/>
</DocsDemo>

## Mandatory properties

- `@label`: The label for the button field.
- `@onClick`: The action to be called when the button clicked. 

## Optional properties

- `@disabled`: Whether the button field is disabled.

## Important

- `class`: To create a custom class you must do it in a CSS file to override the button class