# Table Generic

the generic table is a component which is created from an object.
It is also possible to pass components to the desired column.

# Basic usage:

<DocsDemo as |demo|>
  <demo.example @name="tpk-table-generic-prefab.hbs">  
    <Prefabs::TpkTableGenericPrefab @tableParams={{this.tableParams}}/>
  </demo.example>
  <demo.snippet @name="tpk-table-generic-prefab.hbs"/>
  <demo.snippet @name="tpk-table-generic-prefab.js"/>
</DocsDemo>

## Mandatory properties

- `@tableParams`: The field name in the changeset for validation.



# Advanced Usage:
!!! Ember doc cannotdisplay example with code snippet

```ts
//exemple on gts file
export interface TableRouteComponentSignature {}

export class TableRouteComponent extends Component<TableRouteComponentSignature> {
  emailOptions = ['info@triptyk.eu','loempia@triptyk.eu'];

  tableParamsWithFunctions: TableParams = {
    entity: 'user',
    pageSizes: [10,30,50,75],
    defaultSortColumn: 'firstName',
    columns:[
      {
        field: 'firstName',
        headerName: 'Prénom',
        sortable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable:false,
        component : 'selectEmail', //component name
      },
    ],
    actionMenu: [],
  };

  onUpdate = (selection: unknown, row: UserModel) => {
    row.set('email', selection as string);
    console.log(selection);
    console.log(row);
  }

  <template>
    <div class="flex justify-center items-center h-screen px-32">
      <TpkTableGenericPrefab
        @tableParams={{this.tableParamsWithFunctions}}
        @columnsComponent={{hash
          selectEmail=(component
            SelectTableRegister
              label="Email"
              options=this.emailOptions
              onUpdate=this.onUpdate
          )
        }} 
      />
    </div>
  </template>
}

//exemple on component file to pass to the column
class SelectTableRegister extends Component<TpkSelectSignature & {
    Args: {
      cellValue: string,
      onUpdate: (selection: unknown, row: UserModel) => void,
      row: UserModel
    }
}> {

  onChange = (selection: unknown) => {
    this.args.onUpdate(selection, this.args.row);
  }

  <template>
    <div data-test-table-generic-select>
    <TpkSelectComponent  @options={{@options}} @onChange={{this.onChange}} @selected={{@cellValue}} @label="" as |S| >
      <S.Option as |O|>
        {{O.option}}
      </S.Option>
    </TpkSelectComponent>
    </div>
  </template>;
}
```
## Optional properties

- `@columnsComponent:` The component that will be passed to the column of the table.