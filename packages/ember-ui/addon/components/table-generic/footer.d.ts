import Component from '@glimmer/component';
interface TableGenericFooterComponentArgs {
    hasActionMenu: boolean;
    table: {
        visibleColumns: unknown[];
    };
}
export default class TableGenericFooterComponent extends Component<TableGenericFooterComponentArgs> {
    get colspan(): number;
}
export {};
//# sourceMappingURL=footer.d.ts.map