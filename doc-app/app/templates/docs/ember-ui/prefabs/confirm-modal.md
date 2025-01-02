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
      @cancelLabel="Annuler"
      @confirmLabel="Confirmer"
      @confirmQuestion={{this.confirmQuestion}}
      @isOpen={{this.isOpen}}
    />
    </div>     
  </demo.example>
  <demo.snippet @name="tpk-confirm-modal-prefab.hbs"/>
</DocsDemo>