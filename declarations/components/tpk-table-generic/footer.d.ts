import Component from '@glimmer/component';
import { type TableGenericPaginationActions, type TableGenericPaginationData, type TableGenericTheme } from './pagination';
interface TableGenericFooterComponentArgs {
    hasActionMenu: boolean;
    pageSizes?: number[];
    table: {
        visibleColumns: unknown[];
        tfoot: any;
        actions: TableGenericPaginationActions;
        isLoading: boolean;
        mergedTheme: TableGenericTheme;
        paginationData: TableGenericPaginationData;
    };
}
export interface TableGenericFooterSignature {
    Args: TableGenericFooterComponentArgs;
    Element: never;
}
export default class TableGenericFooter extends Component<TableGenericFooterComponentArgs> {
    get colspan(): number;
}
export {};
//# sourceMappingURL=footer.d.ts.map