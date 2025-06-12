import Component from '@glimmer/component';
import TableGenericComponent from "../tpk-table-generic.gts";
import type { ContentValue, WithBoundArgs } from '@glint/template';
import type { Invokable } from '@glint/template/-private/integration';
export interface TableParams {
    entity: string;
    pageSizes?: number[];
    defaultSortColumn?: string;
    additionalFilters?: Record<string, unknown>;
    relationships?: string;
    rowClick?: (element?: unknown, e?: Event) => void;
    columns: {
        field: string;
        headerName: string;
        sortable: boolean;
        renderElement?: (element: unknown) => void;
        component?: string;
    }[];
    actionMenu?: {
        icon: string;
        action: (...args: unknown[]) => void;
        name: string;
    }[];
}
export interface TableGenericPrefabComponentSignature {
    Args: {
        tableParams: TableParams;
        columnsComponent?: Record<string, Invokable<any>>;
    };
    Blocks: {
        default: [
            WithBoundArgs<typeof TableGenericComponent, 'rowClick' | 'filterText' | 'relationships' | 'registerApi' | 'entity' | 'pageSizes' | 'additionalFilters' | 'defaultSortColumn'>
        ];
    };
    Element: HTMLElement;
}
export default class TableGenericPrefabComponent extends Component<TableGenericPrefabComponentSignature> {
    getComponent: (component: string) => Invokable<any>;
    get pageSizes(): number[];
    get entity(): string;
    get columns(): {
        field: string;
        headerName: string;
        sortable: boolean;
        renderElement?: (element: unknown) => void;
        component?: string;
    }[];
    get hasActionMenu(): boolean;
    displayValue: (element: unknown, field: string) => ContentValue;
    displayRawValue: (element: unknown, field: string) => unknown;
    get actions(): {
        icon: string;
        action: (...args: unknown[]) => void;
        name: string;
    }[] | undefined;
}
//# sourceMappingURL=tpk-table-generic-prefab.d.ts.map