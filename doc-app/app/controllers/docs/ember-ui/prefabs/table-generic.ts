import type { TOC } from "@ember/component/template-only";
import Controller from "@ember/controller";
import type { TpkSelectSignature } from "@triptyk/ember-input/components/tpk-select";



export default class DocsTpkTableGenericPrefabController extends Controller {
  
// BEGIN-SNIPPET tpk-table-generic-prefab.js
  tableParams:any = {
    entity: 'user',
    pageSizes: [10,30,50,75],
    defaultSortColumn: 'firstName',
    columns:[  
    {
    field: 'lastName',
    headerName: 'Nom',
    sortable: true,
    },
    {
    field: 'firstName',
    headerName: 'Prénom',
    sortable: true,
    },
    {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    }],
    actionMenu: [{
      icon: 'edit',
      action: () => {},
      name: 'Edit',
    },
    {
      icon: 'delete',
      action: () => {},
      name: 'Delete',
    }],
  };
// END-SNIPPET
}
