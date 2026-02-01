# Radio buttons group

This component provides a group of radio buttons.

<DocsDemo as |demo|>
  <demo.example @name="tpk-validation-prefab-radio-group.hbs">
    <Prefabs::TpkValidationRadioGroup 
        @changeset={{this.changeset}} 
        @validationField="radio" 
        @groupLabel="groupLabel"
        @mandatory={{true}}
        
        as |Radio|>
        <Radio @value="applati" @label="applati" @selected="applati" />
        <Radio @value="creux" @label="creux" />
    </Prefabs::TpkValidationRadioGroup>
    <p>
    selected : {{changeset-get this.changeset 'radio'}}
    </p>
    <hr/>

    <Prefabs::TpkValidationRadioGroup 
        @changeset={{this.changesetWithErrors}} 
        @validationField="radio" 
        @groupLabel="groupLabel"
        
        as |Radio|>
        <Radio @value="applati" @label="applati" @selected="applati" />
        <Radio @value="creux" @label="creux" />
    </Prefabs::TpkValidationRadioGroup>

    <p>
    selected : {{changeset-get this.changesetWithErrors 'radio'}}
    </p>
  </demo.example>
  <demo.snippet @name="tpk-validation-prefab-radio-group.hbs"/>
</DocsDemo>

## Usage

The `TpkValidationRadioGroup` component is used for a group of radio button. 

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.
- `@value`: value to pass on changeset if selected.

## Optional properties

- `@label`: The label for the input field.
- `@mandatory`: Whether the textarea field is mandatory.
- `@disabled`: Whether the input field is disabled.
- `@classless`: Whether to apply default classes to the component.
- `@onChange`: The action to be called when the selection changes. 

## Css classes

- `.tpk-validation-radio-container` : CSS class which includes the label and the group 
- `.tpk-validation-radio-group-label` : CSS class for the label of the group
- `.tpk-validation-radio-group-group` : CSS class for the group of radio buttons
- `.tpk-radio` : CSS class for styling the input of the radio button (label and input box).
- `.tpk-radio-label` : CSS class for styling the label of the input.
