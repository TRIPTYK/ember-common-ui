# Table generic

A table component.

<DocsDemo as |demo|>
  <demo.example @name="table-generic.hbs">
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
            Firstname
            </Header.Cell>
            <Header.Cell @sortable={{true}} @prop='lastName' data-test-table="lastName">
            Lastname
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
                <Action @action={{this.deleteAction}} data-test-delete >
                    Delete
                </Action>
            </Body.ActionMenu>
        </Table.Body>
        <Table.Footer />
        </TG.Table>
    </TableGeneric>
  </demo.example>
  <demo.snippet @name="table-generic.hbs"/>
</DocsDemo>
