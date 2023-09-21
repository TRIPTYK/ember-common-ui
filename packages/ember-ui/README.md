# @triptyk/ember-ui

This addon will give you some components to build your UI.

## Components

### TableGeneric

This component will display a table with the data you give it. 

```hbs
   <TableGeneric
      @rowClick={{this.rowClick}}
      @pageSize={{this.pageSize}}
      @pageSizes={{this.pageSizes}}
      @entity="user"
    as | TG |>
      <TG.SearchBar />
      <TG.Table as | Table |>
        <Table.Header as |Header|>
          <Header.Cell @sortable={{true}} @prop='firstName' data-test-table="firstName">
            Prénom
          </Header.Cell>
          <Header.Cell @sortable={{true}} @prop='lastName' data-test-table="lastName">
            Nom
          </Header.Cell>
          <Header.Cell @sortable={{false}} @prop='email' data-test-table="email">
            Email
          </Header.Cell>
        </Table.Header>
        <Table.Body as |Body element|>
          <Body.Cell>
            {{element.firstName}}
          </Body.Cell>
          <Body.Cell>
            {{element.lastName}}
          </Body.Cell>
          <Body.Cell>
            {{element.email}}
          </Body.Cell>
          <Body.ActionMenu as |Action|>
            <Action @icon="/assets/icons/delete.svg" @action={{this.deleteAction}} data-test-delete >
              lustre
            </Action>
          </Body.ActionMenu>
        </Table.Body>
        <Table.Footer />
      </TG.Table>
    </TableGeneric>
```

### TpkActionsMenu

```hbs
<TpkActionsMenu @classless={{this.classless}} as |Action|>
  <Action
    @icon={{this.iconSrc}}
    @action={{this.action}}
  >
    ActionText
  </Action>
</TpkActionsMenu>
```

### TpkConfirmModal

```hbs
<TpkConfirmModal 
  @title={{this.confirmQuestion}}
  @isOpen={{this.isOpen}}
  @onConfirm={{this.onConfirm}}
  @onClose={{this.onClose}}
  @classless={{this.classless}}
  as |confirmModal|
  >
  <confirmModal.Confirm>
    Confirmez banane
  </confirmModal.Confirm>
  <confirmModal.Cancel>
    Annuler banane
  </confirmModal.Cancel>
</TpkConfirmModal> 
```

### TpkModal

```hbs
<TpkModal
  @isOpen={{this.isOpen}}
  @title={{this.title}}
  @onClose={{this.onClose}}
  data-test-modal-toggle
as |Modal|>
  <Modal.Content>
    <button type="button">Content</button>
  </Modal.Content>
</TpkModal>
```

### TpkFileList

```
<TpkFileList::Element @document={{this.document}} as |E|>
    <E.Download data-test-download-button />
    <E.Delete data-test-delete-button />
</TpkFileList::Element>
```

### TpkStackList

```hbs
<TpkStackList
  @data={{this.data}}
  @onRemove={{this.onRemoveData}}
  @onAdd={{this.onAddData}}
  @titleForAdd={{this.titleForAdd}}
  as |S|
>
  <S.Title as |T|>
    {{get T.item 'title'}}
  </S.Title>
  <S.Content as |C|>
    {{get C.item 'title'}}
  </S.Content>
</TpkStackList>
```

### TpkStepper

```hbs
<TpkStepper @startStep={{this.startStep}} @classless={{this.classless}} as |Stepper|>
    <Stepper.Stepper />
    <Stepper.Step as |S|>
      <S.Header>
        Step {{S.index}}
      </S.Header>
      <div>
        Content {{S.index}}
      </div>
  </Stepper.Step>
  <Stepper.Step as |S|>
      <S.Header>
      Step {{S.index}}
      </S.Header>
      <div>
        Content {{S.index}}
      </div>
    </Stepper.Step>
</TpkStepper>
```

