import Component from '@glimmer/component';
import { ComponentLike } from '@glint/template';
import TableGenericHeaderCellComponent from './header/cell';

export interface TableGenericHeaderComponentSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
    hasActionMenu: boolean;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Cell: ComponentLike<TableGenericHeaderCellComponent>;
      },
    ];
  };
}

export default class TableGenericHeaderComponent extends Component<TableGenericHeaderComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic/header': typeof TableGenericHeaderComponent;
  }
}
