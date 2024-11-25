# Ember validation radio

Ember validation radio

<DocsDemo as |demo|>
  <demo.example @name="radio-validation-src.hbs">
  <div>
    <TpkValidationRadio 
      @changeset={{this.changeset}}
      @validationField="radio"
      @label={{'Click on me!'}}
      @value={{this.first}}
      @selected={{this.first}}
      
      as |T|>
      <T.Input />
      <T.Label /> 
    </TpkValidationRadio>

    <TpkValidationRadio 
      @changeset={{this.changeset}}
      @validationField="radio"
      @label='No, click on me!'
      @value={{this.second}} 
      as |T|>
      <T.Input />
      <T.Label /> 
    </TpkValidationRadio>

    <TpkValidationRadio 
      @changeset={{this.changeset}}
      @validationField="radio"
      @label='I am jalous if you do not click on me'
      @value={{this.third}}
      @classless={{true}}
      as |T|>
      <T.Input />
      <T.Label /> 
    </TpkValidationRadio>
  </div>
 
  Result: {{changeset-get this.changeset 'radio'}}

  </demo.example>
  <demo.snippet @name="radio-validation-src.hbs"/>
</DocsDemo>

### Args

**@label**: A string parameter. It is the label displayed above the radio button.

**@validationField**: Name of the validation field assigned to the radio button.

**@changeset**: Is a way to manage and validate data modifications before applying them to a model.

**@classless** : The argument allows overriding the CSS class of the input.


### CSS

**.tpk-radio** : CSS class for styling the input of the radio button (label and input box).

**.tpk-radio-label** : CSS class for styling the label of the input.

