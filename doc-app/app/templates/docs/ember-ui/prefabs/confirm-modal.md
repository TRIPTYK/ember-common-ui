# Modal

A modal component.

<DocsDemo as |demo|>
  <demo.example @name="tpk-confirm-modal-prefab.hbs">
    <button class="open-modal" {{on "click" this.open}} type="button">
      Open the modal
    </button>
     <div id="tpk-modal">
    <Prefabs::TpkConfirmModalPrefab
      @onClose={{this.onClose}}
      @onConfirm={{this.onConfirm}}
      @cancelText="Annuler"
      @confirmText="Confirmer"
      @confirmQuestion={{this.confirmQuestion}}
      @isOpen={{this.isOpen}}
    />
    </div>     
  </demo.example>
  <demo.snippet @name="tpk-confirm-modal-prefab.hbs"/>
</DocsDemo>

## Mandatory properties

- `@onClose`: this is a function to close modal.
- `@onConfirm`: this is a function to close modal.
- `@cancelText`: this is a string to populate cancel button
- `@confirmText`: this is a string to populate confirm button
- `@confirmQuestion`: this is the text of confirmation to user
- `@isOpen` : boolean to close modal