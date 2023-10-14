import { TOC } from '@ember/component/template-only';

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

const TableGenericBodyActionComponent: TOC<TableGenericBodyActionComponentSignature> =
  <template>
    <@Action @action={{@action}} @icon={{@icon}} ...attributes>
      {{yield}}
    </@Action>
  </template>;

export default TableGenericBodyActionComponent;
