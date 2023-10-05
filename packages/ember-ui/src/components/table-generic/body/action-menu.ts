import Component from '@glimmer/component';
import { WithBoundArgs } from '@glint/template';
import type TableGenericBodyActionComponent from './action';

interface TableGenericBodyActionMenuComponentSignature {
  Args: {
    item: unknown;
    index: number;
    classless?: boolean;
    isExpanded: boolean;
    action: (...args: unknown[]) => void;
    registerActionMenu: (element: HTMLTableCellElement, args: []) => unknown;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [WithBoundArgs<typeof TableGenericBodyActionComponent, 'Action'>];
  };
}

export default class TableGenericBodyActionMenuComponent extends Component<TableGenericBodyActionMenuComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic/body/action-menu': typeof TableGenericBodyActionMenuComponent;
  }
}
