# Ember input/radio

Ember input/radio content

<DocsDemo as |demo|>
  <demo.example @name="radio.hbs">
  <div>
    <h3>Choose your gender</h3>
        <TpkRadio 
            @label='Female'
            @classless={{true}}
            @selected="Female"
            @value="Female"
            @name="gender-radio"
            @onChange={{this.setRadio}}
            as |C|
        >
            <C.Input class='text-yellow-300' />
             <C.Label class='text-blue-300' />
        </TpkRadio>
        <TpkRadio 
            @label='Male'
            @classless={{true}}
            @value="Male"
            @name="gender-radio"
            @onChange={{this.setRadio}}
            as |C|
        >
             <C.Input class='text-yellow-300' />
            <C.Label class='text-blue-300' />
        </TpkRadio>
        <TpkRadio 
            @label='Not shure'
            @classless={{true}}
            @value="Not shure"
            @name="gender-radio"
            @onChange={{this.setRadio}}
            as |C|
        >
             <C.Input class='text-yellow-300' />
            <C.Label class='text-blue-300' />
        </TpkRadio>
        <div class="result_box">
            Value : {{this.value}}
        </div>
    </div>
  </demo.example>
  <demo.snippet @name="radio.hbs"/>
</DocsDemo>

### The arguments for the radio component are :

- **@label**:
  > **description**: set the label value  
  > **value**: a string type
* **@classless**:
  > **description**: removes the default CSS classes to adapt the CSS style to your layout  
  > **value**: a boolean written in hbs ```{{true}}```
- **@selected**:
  > **description**: indicates which value is selected in your radios; it's not mandatory to have it on each radio, but at least one is needed to initiate the selection in your group.  
  > **value**: a string type that must be identical to the value argument.
- **@value**:
  > **description**: sets the value of the radio group which can be retrieved in your application.  
  > **value**: a string type.
- **@name**:
  > **description**: sets the name of the radio group, thus linking the radios in the group  
  > **value**: a string type that must be identical among radios in the same group.
- **@onChange**:
  > **description**: specifies the method called when the state of the radio is changed.  
  > **value**: an hbs type string which should be the name of the method defined in the controller. e.g., ```{{this.setRadio}}```

### This component has 2 mandatory yields:
- **Input**: representing the radio type input
- **Label**: representing the label of our radio

These yields allow for customization of the structure and style of our component.
