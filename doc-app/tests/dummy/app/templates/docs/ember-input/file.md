# Ember input/file

<DocsDemo as |demo|> 
  <demo.example @name="tpk-file.hbs">
    <TpkFile 
      @label="Add your profile image"
      @accept="image/*"
      @multiple={{false}}
      @disabled={{false}}
      @classless={{false}}
      @changeEvent='change'
      @onChange={{this.onChange}}
    as |I|>
        <I.Label />
        <I.Input />
    </TpkFile>
   </demo.example>
  <demo.snippet @name="tpk-file.hbs"/>
</DocsDemo>

## Arguments description

- **classless?: boolean**
    - This argument is optional and is a boolean. If it is supplied and evaluates to true, the CSS class tpk-file-input will not be added to the file field. Otherwise, the class will be added.
- **accept?: string**
    - This argument is optional and expects a string. It specifies the file types the user can select. For example, "image/*" will accept all image types.
- **disabled?: boolean**
    - This argument is optional and is a boolean. If it is supplied and evaluates to true, the file field will be disabled. Otherwise, it will be enabled.
- **multiple?: boolean**
    - This argument is optional and is a boolean. If provided and evaluated to true, the file field will allow the user to select multiple files at once. Otherwise, only one file can be selected.
- **changeEvent: 'input' | 'change'**
    - This argument is mandatory and must be one of two string values: 'input' or 'change'. It specifies the type of change event associated with the file input field. This can be useful to customize when the onChange callback function is triggered.
- **onChange: (event: Event) => void**
    - This argument is mandatory and waits for a callback function that takes an argument of type Event. This callback function will be called when the specified change event ('input' or 'change') occurs on the file field. It can be used to perform actions in response to file changes.
