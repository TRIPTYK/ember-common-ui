# Actions menu

A component for a tooltip-like actions menu.

<DocsDemo as |demo|>
  <demo.example @name="actions-menu-src.hbs">
    <TpkActionsMenu as |Action|>
        <Action
            @icon="/assets/edit.svg"
            @action={{this.showEditPopup}}
        >
        Edit
        </Action>
    </TpkActionsMenu>
  </demo.example>
  <demo.snippet @name="actions-menu-src.hbs"/>
</DocsDemo>