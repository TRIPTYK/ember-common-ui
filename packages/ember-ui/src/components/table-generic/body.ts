import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { action } from '@ember/object';
import { ComponentLike, WithBoundArgs } from '@glint/template';
import TableGenericBodyCellComponent from './body/cell';
import TableGenericBodyActionMenuComponent from './body/action-menu';

export interface TableGenericBodyComponentSignature {
  Args: {
    classless?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
    rowClick: (...args: unknown[]) => void;
    registerActionMenu: (element: HTMLTableCellElement, args: []) => unknown;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Cell: ComponentLike<TableGenericBodyCellComponent>;
        ActionMenu: WithBoundArgs<
          typeof TableGenericBodyActionMenuComponent,
          'registerActionMenu'
        >;
      },
      unknown,
    ];
  };
}

export default class TableGenericBodyComponent extends Component<TableGenericBodyComponentSignature> {
  @tracked isExpanded = false;

  get bodyClass() {
    if (this.args.classless) {
      return '';
    }
    return this.isExpanded ? 'body expanded' : 'body';
  }

  @action toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic/body': typeof TableGenericBodyComponent;
  }
}
