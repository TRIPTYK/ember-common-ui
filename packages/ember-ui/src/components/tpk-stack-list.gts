import type { WithBoundArgs } from '@glint/template';
import TpkStackListTitleComponent from './tpk-stack-list/title.gts';
import TpkStackListContentComponent from './tpk-stack-list/content.gts';
import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import TpkStackListItem from './tpk-stack-list/item.gts';
import TpkStackListHead from './tpk-stack-list/head.gts';
import { on } from '@ember/modifier';

export interface TpkStackListComponentSignature {
  Args: {
    classless?: boolean;
    onRemove: (item: unknown) => void;
    data: unknown[];
    key?: string;
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

const TpkStackListComponent: TOC<TpkStackListComponentSignature> = <template>
  {{#each @data key=@key as |item index|}}
    <TpkStackListItem @zIndex={{index}} @index={{index}} as |I|>
      <div class='tpk-stack-head'>
        {{yield
          (hash
            Title=(component
              TpkStackListTitleComponent isExpanded=I.isExpanded item=item
            )
          )
        }}
        <TpkStackListHead
          @isExpanded={{I.isExpanded}}
          @toggleExpanded={{I.toggleExpanded}}
          @item={{item}}
          @index={{index}}
          @onRemove={{@onRemove}}
          @readOnly={{@readOnly}}
        />
      </div>
      {{yield
        (hash
          Content=(component
            TpkStackListContentComponent
            isExpanded=I.isExpanded
            item=item
            index=index
          )
        )
      }}
    </TpkStackListItem>
  {{/each}}
  {{#unless @readOnly}}
    <button
      type='button'
      class='link icon {{@customButtonClass}}'
      data-test-add-stackList-item
      {{on 'click' @onAdd}}
    >
      <img src='/assets/icons/plus.svg' alt='add' class='w-5 h-5' />
      <span>
        {{@titleForAdd}}
      </span>
    </button>
  {{/unless}}
</template>;

export default TpkStackListComponent;
