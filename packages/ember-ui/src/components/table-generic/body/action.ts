import Component from '@glimmer/component';

export interface TableGenericBodyActionComponentSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Action: any;
    action: (...args: unknown[]) => void;
    icon: string;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

export default class TableGenericBodyActionComponent extends Component<TableGenericBodyActionComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic/body/action': typeof TableGenericBodyActionComponent;
  }
}
