import Component from '@glimmer/component';

interface TableGenericBodyCellComponentSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

export default class TableGenericBodyCellComponent extends Component<TableGenericBodyCellComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic/body/cell': typeof TableGenericBodyCellComponent;
  }
}
