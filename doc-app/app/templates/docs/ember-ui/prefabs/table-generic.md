# Table Generic

the generic table is a component which is created from an object.
It is also possible to pass components to the desired column.

Basic usage:

<DocsDemo as |demo|>
  <demo.example @name="tpk-table-generic-prefab.hbs">  
    <Prefabs::TpkTableGenericPrefab @tableParams={{this.tableParams}}/>
  </demo.example>
  <demo.snippet @name="tpk-table-generic-prefab.hbs"/>
  <demo.snippet @name="tpk-table-generic-prefab.js"/>
</DocsDemo>

## Mandatory properties

- `@tableParams`: The field name in the changeset for validation.

Advanced usage:

<DocsDemo as |demo|>
  <demo.example @name="tpk-table-generic-prefab.hbs">  
    <Prefabs::TpkTableGenericPrefab 
      @tableParams={{this.tableParams}}
      @columnsComponent={{hash
              tpkinput=(component
                TpkInput
                  value=this.value
                  onChange=this.onChange
              )
      }}
    />
  </demo.example>
  <demo.snippet @name="tpk-table-generic-prefab.hbs"/>
  <demo.snippet @name="tpk-table-generic-prefab.js"/>
</DocsDemo>