import Component from '@glimmer/component';
import TableGenericComponent from "../tpk-table-generic.gts";
import TpkTableGeneric from "../tpk-table-generic.gts";
import type { ContentValue, WithBoundArgs } from '@glint/template';
import { get } from '@ember/object';
import type {  Invokable } from '@glint/template/-private/integration';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';


export interface TableParams {
  entity: string;
  pageSizes?: number[];
  defaultSortColumn?: string;
  additionalFilters?: Record<string, unknown>;
  relationships?: string;
  rowClick?: (element: unknown) => void;
  columns: {
    field: string;
    headerName: string;
    sortable: boolean;
    renderElement?: (element: unknown) => void;
    component?: string;
  }[];
  actionMenu?: { icon: string; action: (...args: unknown[]) => void; name: string }[];
}

export interface TableGenericPrefabComponentSignature {
  Args: {
     tableParams:TableParams,
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     columnsComponent?: Record<string, Invokable<any>>;
  };
  Blocks: {
    default: [
      WithBoundArgs<typeof TableGenericComponent, 'rowClick' | 'filterText' | 'relationships' | 'registerApi' | 'entity' | 'pageSizes' | 'additionalFilters' | 'defaultSortColumn'>
    ];
  };
  Element: HTMLElement;
}

export default class TableGenericPrefabComponent extends Component<TableGenericPrefabComponentSignature>{
  getComponent = (component: string) => {
    if (!this.args.columnsComponent || !this.args.columnsComponent[component]) {
      throw new Error(`Component ${component} not found`);
    }
    return this.args.columnsComponent[component];
  }
  
  get pageSizes(){
    if(this.args.tableParams.pageSizes){
      return this.args.tableParams.pageSizes;
    }
    return [5, 10, 25];
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

  registerActionMenu= (element: HTMLTableCellElement, args: []) => {
    console.log(element, args);
    
    return this.args.tableParams.actionMenu;
  }

  displayRawValue = (element: unknown, field: string) => {
    return get(element, field);
  }

  get actions(){
    return this.args.tableParams.actionMenu;
  }


  <template>
    <div class="tpk-table-generic-container"
     data-test-table-generic-prefab>
      <TpkTableGeneric
        @pageSizes={{this.pageSizes}}
        @additionalFilters={{@tableParams.additionalFilters}}
        @defaultSortColumn={{@tableParams.defaultSortColumn}}
        @entity={{this.entity}}
        @rowClick={{@tableParams.rowClick}}
        @relationships={{@tableParams.relationships}}
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
                {{#each this.actions as |actionElement|}}
                {{log actionElement.action}}
                  <Action @icon={{actionElement.icon}} @action={{fn actionElement.action element}} >
                    {{actionElement.name}}
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
