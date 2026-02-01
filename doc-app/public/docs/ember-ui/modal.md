# Modal

A modal component.

<DocsDemo as |demo|>
  <demo.example @name="tpk-modal.hbs">
    <button class="open-modal" {{on "click" this.open}} type="button">
      Open the modal
    </button>
    <div class="static" id="tpk-modal"></div>
    <div id="other"></div>
      <TpkModal
        @isOpen={{this.isOpen}}
        @title={{this.title}}
        @onClose={{this.onClose}}
        data-test-modal-toggle
      as |Modal|>
        <Modal.Content>
          <p>Click outside to close</p>
          <button type="button">Focusable element</button>
        </Modal.Content>
      </TpkModal>
  </demo.example>
  <demo.snippet @name="tpk-modal.hbs"/>
</DocsDemo>
