# Ember input validation/radio group

Ember input validation/radio group content


<DocsDemo as |demo|>
  <demo.example @name="radio-group-validation-src.hbs">
  <TpkValidationRadioGroup @mandatory={{true}} @groupLabel="This is my favority label" @changeset={{this.changeset}} @validationField="radio" as |R|>
    <R.Radio @value={{'maybe'}} @label={{"it's me"}} data-test-radio="good" as |I| >
      <I.Input />
      <I.Label />
    </R.Radio>
    <R.Radio  @value={{'or not'}} @label="no it's me" data-test-radio="bad" as |I| >
      <I.Input />
      <I.Label />
    </R.Radio>
  </TpkValidationRadioGroup>

  Result: {{changeset-get this.changeset 'radio'}}

  </demo.example>
  <demo.snippet @name="radio-group-validation-src.hbs"/>
</DocsDemo>

### Args

**@label**: A string parameter. It is the label displayed above the radio button.

**@groupLabel** : Allows you to give a name to a group

**@validationField**: Name of the validation field assigned to the group of radio buttons.

**@changeset**: Is a way to manage and validate data modifications before applying them to a model.

**@classless** : The argument allows overriding the CSS class of the input.

### Yields

**I.Label**: The component representing the label.

**I.Input**: The component representing the radio.


### CSS

**.tpk-validation-radio-container** : CSS class which includes the label and the group 

**.tpk-validation-radio-group-label** : CSS class for the label of the group

**.tpk-validation-radio-group-group** : CSS class for the group of radio buttons

**.tpk-radio** : CSS class for styling the input of the radio button (label and input box).

**.tpk-radio-label** : CSS class for styling the label of the input.