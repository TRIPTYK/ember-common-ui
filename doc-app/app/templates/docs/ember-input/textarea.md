# Ember input/textarea

A composable textarea input element.

<DocsDemo as |demo|>
  <demo.example @name="tpk-Textarea.hbs">
      <TpkTextarea
        @value={{this.value}}
        @onChange={{this.onChange}}
        @maxLength={{150}}
        @classless={{false}}
        @changeEvent='change'
        @label="History of Tomster and Zoey"
      as |C|>
          <div>
            <C.Label />
            <span class="text-area-count">
              {{C.charCount}} / {{C.maxLength}}
            </span>
          </div>
          <C.Input />
      </TpkTextarea>
      <div>
        Content: {{this.value}}
      </div>
  </demo.example>
  <demo.snippet @name="tpk-Textarea.hbs"/>
</DocsDemo>

### Args

**@value**: A string parameter. It is value the contained within the text area.

**@onChange**: A function parameter. What should happen when the value of the textarea is changed.
the function receive the value and the event as args.

**@maxLength**: A number parameter. It is the maximum length of the string within the textarea.

**@changeEvent**: A string parameter. It should be either 'input' or 'change'.

**@label**: A string parameter. It is the label displayed above the textarea.

**@classless**: A boolean paramater. Remove all the classes actually in the component.

### Yields

**C.Label**: The component representing the label.

**C.Input**: The component representing the textarea.

**C.charCount**: The current length of the String within the textarea

**C.maxLength**: The maximum length of the String within the textarea 

### CSS

**.tpk-textarea**: the class added by default to the div wrapping the textarea and the label. 

**.tpk-textarea-label**: the class added by default to the label.

**.tpk-textarea-input**: the class added by default to the textarea.

