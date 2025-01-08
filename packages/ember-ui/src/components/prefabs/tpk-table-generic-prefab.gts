import Component from '@glimmer/component';
import type { TableGenericComponentSignature } from "../tpk-table-generic.gts";
import TableGenericComponent from "../tpk-table-generic.gts";
import TpkTableGeneric from "../tpk-table-generic.gts";
import type { ContentValue, WithBoundArgs } from '@glint/template';
import { get } from '@ember/object';
import type { DirectInvokable } from '@glint/template/-private/integration';


export interface TableParams {
  entity: string;
  pageSizes?: number[];
  defaultSortColumn?: string;
  columns: {
    field: string;
    headerName: string;
    sortable: boolean;
    renderElement?: (element: unknown) => void;
    component?: string;
  }[];
  actionMenu?: { icon: string; action: () => void; name: string }[];
}

export interface TableGenericPrefabComponentSignature {
  Args: TableGenericComponentSignature["Args"] & {
     tableParams:TableParams,
     columnsComponent: Record<string, DirectInvokable>;
  };
  Blocks: {
    default: [
      WithBoundArgs<typeof TableGenericComponent, 'rowClick' | 'filterText' | 'relationships' | 'registerApi' | 'entity' | 'pageSizes' | 'additionalFilters' | 'defaultSortColumn'>
    ];
  };
  Element: HTMLElement;
}

export default class TableGenericPrefabComponent extends Component<TableGenericPrefabComponentSignature>{
  getComponent = (component: string): DirectInvokable => {
    if (!this.args.columnsComponent[component]) {
      throw new Error(`Component ${component} not found`);
    }
    return this.args.columnsComponent[component] as DirectInvokable;
  }
  
  get pageSizes(){
    if(this.args.tableParams.pageSizes){
      return this.args.tableParams.pageSizes;
    }
    return [5, 10, 25];
  }

  get filterText(): string | undefined {
    if(this.args.filterText){
      return this.args.filterText;
    }
    return this.filterText;
  }

  get entity(){
    if(!this.args.tableParams.entity){
      throw new Error("entity is required");
    }
    return this.args.tableParams.entity;
  }

  get columns() {
    if(!this.args.tableParams.columns){
      throw new Error("entityKeys is required");
    }
    return this.args.tableParams.columns
  }

  get hasActionMenu(){
    if(!this.args.tableParams.actionMenu){
      return false;
    }
    return this.args.tableParams.actionMenu.length ? true : false;
  }

  displayValue = (element: unknown, field: string): ContentValue => {
    const value = get(element, field);
    const column = this.columns.find(column => column.field === field);
    if(column?.renderElement){
      return column.renderElement(value);
    }

    return String(value);
  }
  displayRawValue = (element: unknown, field: string) => {
    return get(element, field);
  }


  get actions(){
    return this.args.tableParams.actionMenu;
  }

  <template>
    <div class="tpk-table-generic-container" data-test-table-generic-prefab>
      <TpkTableGeneric
        @pageSizes={{this.pageSizes}}
        @additionalFilters={{@additionalFilters}}
        @defaultSortColumn={{@tableParams.defaultSortColumn}}
        @entity={{this.entity}}
        @relationships={{@relationships}}
        @filterText={{this.filterText}}
      as | TG |>
        <TG.SearchBar />
        <TG.Table as | Table |>
          <Table.Header as |Header|>
            {{#each this.columns as |column|}}
              <Header.Cell @sortable={{column.sortable}} @prop={{column.field}}>
                {{column.headerName}}
              </Header.Cell>
            {{/each}}
          </Table.Header>
          <Table.Body as |Body element|>
            {{#each this.columns as |column|}}
              <Body.Cell >
                {{#if column.component}}
                {{'Prout'}}
                  {{#let (this.getComponent column.component) as |ComponentName|}}
                    <ComponentName
                      @row={{element}}
                      @field={{column.field}}
                      @cellValue={{this.displayRawValue element column.field}}
                      @cellValueFormated={{this.displayValue element column.field}}
                    />
                  {{/let}}
                {{else}}
                  {{this.displayValue element column.field}}
                {{/if}}
              </Body.Cell>
            {{/each}}
            {{#if this.hasActionMenu}}
              <Body.ActionMenu  as |Action|>
                {{#each this.actions as |element|}}
                  <Action @icon={{element.icon}} @action={{element.action}} >
                    {{element.name}}
                  </Action>
                {{/each}}
              </Body.ActionMenu>
            {{/if}}
          </Table.Body>
          <Table.Footer />
        </TG.Table>
    </TpkTableGeneric>
  </div>
</template>
}
