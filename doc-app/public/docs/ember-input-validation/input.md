# Ember input validation/input

Ember input validation/input content

<DocsDemo as |demo|>
    <demo.example @name="input-validation-src.hbs">
        <TpkValidationInput 
        @label={{this.label}} 
        @onChange={{this.onChange}}
        @changeset={{this.changeset}}
        @validationField="delete_text" as |I|>
        <I.Label/>
        <I.Input/>
        <div>
        {{#each I.errors as |error|}}
          <span>
              {{error.message}}
          </span>
        {{/each}}
      </div>
      </TpkValidationInput>
    </demo.example>
    <demo.snippet @name="input-validation-src.hbs"/>
</DocsDemo>

### Args

**@label**: A string parameter. It is the label displayed above the checkbox.

**@validationField**: Name of the validation field assigned to the checkbox.

**@onChange**: A function parameter. What should happen when the value of the checkbox is changed.
the function receive the value and the event as args.

**@changeset**: Is a way to manage and validate data modifications before applying them to a model.

### Yields

**I.Label**: The component representing the label.

**I.Input**: The component representing the checkbox.

**div**: represents the HTML element where the error will be displayed.

### CSS

**.tpk-input** : CSS class for styling the input of the checkbox (label and input box).

**.tpk-input input** :  CSS class for styling the targeted input.

**.tpk-label** : CSS class for styling the label of the input.

**[data-has-error="false"]** : CSS element when there is no error.

**[data-has-error="true"]** : CSS element when an error is caught. when it's true error was displayed on the div element.
