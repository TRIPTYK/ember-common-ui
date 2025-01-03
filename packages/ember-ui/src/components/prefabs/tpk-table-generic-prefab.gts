import Component from '@glimmer/component';
import type { TableGenericComponentSignature } from "../tpk-table-generic.gts";
import TableGenericComponent from "../tpk-table-generic.gts";
import TpkTableGeneric from "../tpk-table-generic.gts";
import type { WithBoundArgs } from '@glint/template';
import t from 'ember-intl/helpers/t';

export interface TableGenericPrefabComponentSignature {
  Args: TableGenericComponentSignature["Args"] & {
     columns: {
      field: string;
      headerName: string;
      sortable: boolean;
     }[]
  };
  Blocks: {
    default: [
      WithBoundArgs<typeof TableGenericComponent, 'rowClick' | 'filterText' | 'relationships' | 'registerApi' | 'entity' | 'pageSizes' | 'additionalFilters' | 'defaultSortColumn'>
    ];
  };
  Element: HTMLElement;
}

export default class TableGenericPrefabComponent extends Component<TableGenericPrefabComponentSignature>{

  get pageSizes(){
    if(this.args.pageSizes){
      return this.args.pageSizes;
    }
    return [5, 10, 25];
  }

  get filterText(): string | undefined {
    if(this.args.filterText){
      return this.args.filterText;
    }
    return this.filterText;
  }

  get columns() {
    console.log(this.args.columns);
    if(!this.args.columns){
      throw new Error("entityKeys is required");
      
    }
    return this.args.columns
  }
  
  <template>
    <TpkTableGeneric
      @pageSizes={{this.pageSizes}}
      @additionalFilters={{@additionalFilters}}
      @defaultSortColumn={{@defaultSortColumn}}
      @entity={{@entity}}
      @relationships={{@relationships}}
      @filterText={{this.filterText}}
    as | TG |>
      <TG.SearchBar />
      <TG.Table as | Table |>
        <Table.Header as |Header|>
          {{#each this.columns as |column|}}
            {{!-- <Header.Cell @sortable={{column.sortable}} @prop={{column.field}} data-test-table={{column.field}}>
              {{column.headerName}}
            </Header.Cell> --}}
          {{/each}}
        </Table.Header>
        <Table.Body as |Body element|>
          {{!-- {{#each this.columns as |column|}}
            <Body.Cell >
              {{element[column.field}]}}
            </Body.Cell>
          {{/each}} --}}
        </Table.Body>
        <Table.Footer />
      </TG.Table>
  </TpkTableGeneric>
</template>
} 