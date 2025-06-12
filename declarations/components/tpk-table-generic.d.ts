import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import TableGenericSearchBarComponent from './tpk-table-generic/search-bar.gts';
import TableGenericTableComponent, { type TableApi } from './tpk-table-generic/table.gts';
import IntlService from 'ember-intl/services/intl';
export interface TableGenericComponentSignature {
    Args: {
        entity: string;
        relationships?: string;
        pageSizes?: number[];
        filterText?: string;
        pageSize?: number;
        defaultSortColumn?: string;
        registerApi?: (api: TableApi) => unknown;
        rowClick?: (element?: unknown, e?: Event) => void;
        placeholder?: string;
        label?: string;
        additionalFilters?: Record<string, unknown>;
    };
    Blocks: {
        default: [
            {
                onSearch: (value: string) => void;
                SearchBar: WithBoundArgs<typeof TableGenericSearchBarComponent, 'onSearch' | 'label' | 'placeholder'>;
                Table: WithBoundArgs<typeof TableGenericTableComponent, 'rowClick' | 'filterText' | 'relationships' | 'registerApi' | 'entity' | 'pageSizes' | 'pageSize' | 'additionalFilters' | 'defaultSortColumn'>;
            }
        ];
    };
}
export default class TableGenericComponent extends Component<TableGenericComponentSignature> {
    intl: IntlService;
    filterText?: string;
    get label(): string;
    get placeholder(): string;
    onSearch(value: string): void;
    rowClick(element?: unknown, e?: Event): void;
}
//# sourceMappingURL=tpk-table-generic.d.ts.map