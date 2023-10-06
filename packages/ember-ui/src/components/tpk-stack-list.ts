import Component from '@glimmer/component';
import { WithBoundArgs } from '@glint/template';
import TpkStackListTitleComponent from './tpk-stack-list/title';
import TpkStackListContentComponent from './tpk-stack-list/content';

export interface TpkStackListComponentSignature {
  Args: {
    classless?: boolean;
    onRemove: (item: unknown) => void;
    data: unknown[];
    onAdd: () => void;
    titleForAdd: string;
    readOnly: boolean;
    customButtonClass?: string;
  };
  Element: HTMLUListElement;
  Blocks: {
    default: [
      | {
          Title: WithBoundArgs<
            typeof TpkStackListTitleComponent,
            'isExpanded' | 'item'
          >;
        }
      | {
          Content: WithBoundArgs<
            typeof TpkStackListContentComponent,
            'isExpanded' | 'item' | 'index'
          >;
        },
    ];
  };
}

export default class TpkStackListComponent extends Component<TpkStackListComponentSignature> {}
