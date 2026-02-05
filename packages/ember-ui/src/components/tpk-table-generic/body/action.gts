import type { TOC } from '@ember/component/template-only';
import type { Invokable } from '@glint/template/-private/integration';

export interface TableGenericBodyActionComponentSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Action: any;
    action: (...args: unknown[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: TOC<{ Element: SVGSVGElement }> | Invokable<any>;
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
