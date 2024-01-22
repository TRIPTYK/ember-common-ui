# Ember input validation/checkbox

Ember input validation/checkbox content


<DocsDemo as |demo|>
  <demo.example @name="checkbox-validation-src.hbs">
    <TpkValidationCheckbox 
      @label={{this.label}} 
      @changeset={{this.changeset}}
      @validationField="checked"
      @onChange={{this.onChange}}
      as |T|>
      <T.Input />
      <T.Label />
      <div>
        {{#each T.errors as |error|}}
          <span>
              {{error.message}}
          </span>
        {{/each}}
      </div>
    </TpkValidationCheckbox>
  </demo.example>
  <demo.snippet @name="checkbox-validation-src.hbs"/>
</DocsDemo>

### Args

**@label**: A string parameter. It is the label displayed above the checkbox.

**@validationField**: Name of the validation field assigned to the checkbox.

**@onChange**: A function parameter. What should happen when the value of the checkbox is changed.
the function receive the value and the event as args.

**@changeset**: Is a way to manage and validate data modifications before applying them to a model.

### Yields

**T.Label**: The component representing the label.

**T.Input**: The component representing the checkbox.

**div**: represents the HTML element where the error will be displayed.

### CSS

**.tpk-checkbox-input** : CSS class for styling the input of the checkbox.

**.tpk-checkbox-label** : CSS class for styling the label of the checkbox.

**[data-has-error="false"]** : CSS element when there is no error.

**[data-has-error="true"]** : CSS element when an error is caught. when it's true error was displayed on the aside element.