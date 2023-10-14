import Component from '@glimmer/component';

export interface TableGenericHeaderCellComponentSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    header: any;
    sortable?: boolean;
    prop?: string;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

export default class TableGenericHeaderCellComponent extends Component<TableGenericHeaderCellComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic/header/cell': typeof TableGenericHeaderCellComponent;
  }
}
