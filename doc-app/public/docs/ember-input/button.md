# Ember input/button

A button component that performs an onClick task.

By default, prevents spam click by waiting the current task to finish before accepting a new one.

<DocsDemo as |demo|>
  <demo.example @name="tpk-button.hbs">
      <TpkButton
          @onClick={{this.incrementCounter}}
          @allowSpam={{true}}
          class="button"
        >
          Spam me @allowSpam={{true}}
      </TpkButton>
      <TpkButton
        @onClick={{this.incrementCounter}}
        class="button"
      >
        Spam me @allowSpam={{false}}
      </TpkButton>
      <div>
        Counter : {{this.counter}}
      </div>
  </demo.example>
  <demo.snippet @name="tpk-button.hbs"/>
</DocsDemo>

