# Input File

This is an input with a dropzone that allows to upload multiple files. You can also find a list of uploaded files and dowload/delete theme.

<DocsDemo as |demo|>
  <demo.example @name="prefab-tpk-file.hbs">
      <Prefabs::TpkValidationFileList
        @label="File"
        @changeset={{this.changeset}} 
        @validationField="files"
        @placeholder="Glisser-déposer un fichier ou cliquer pour sélectionner un fichier (max 10Mo)"
      />
      <Prefabs::TpkValidationFileList
        @label="Disabled"
        @changeset={{this.changeset}} 
        @validationField="disabled"
        @placeholder="Glisser-déposer un fichier ou cliquer pour sélectionner un fichier (max 10Mo)"
        @disabled=true
      />
      <Prefabs::TpkValidationFileList
        @label="Error"
        @changeset={{this.changeset}} 
        @validationField="error"
        @placeholder="Glisser-déposer un fichier ou cliquer pour sélectionner un fichier (max 10Mo)"
        @mandatory=true
      />
  </demo.example>
  <demo.snippet @name="prefab-tpk-file.hbs"/>
</DocsDemo>

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.

## Optional properties

- `@label`: The label for the input field.
- `@disabled`: Whether the input field is disabled.
- `@mandatory`: Whether the input file multiple field is mandatory.
- `@onChange`: The action to be called when the selection changes. 
- `@disableDownload`: Whether the download button is disabled.
- `@placeholder`: The placeholder for the dropzone area.
