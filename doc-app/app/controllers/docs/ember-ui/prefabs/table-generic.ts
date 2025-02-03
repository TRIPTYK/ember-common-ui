import Controller from "@ember/controller";
import { action } from "@ember/object";



export default class DocsTpkTableGenericPrefabController extends Controller {
  
// BEGIN-SNIPPET tpk-table-generic-prefab.js
  tableParams:any = {
    entity: 'user',
    pageSizes: [10,30,50,75],
    defaultSortColumn: 'firstName',
    rowClick(element: any){
      alert(`row clicked ${element.id}`);
    },
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
      action: (element:any) => {alert(`edit action ${element.id}`);
      },
      name: 'Edit',
    },
    {
      icon: 'delete',
      action: () => {alert('delete action')},
      name: 'Delete',
    }],
  };
  
// END-SNIPPET
}