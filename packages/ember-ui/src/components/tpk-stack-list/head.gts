import type { TOC } from '@ember/component/template-only';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

export interface TpkStackListHeadComponentSignature {
  Args: {
    isExpanded: boolean;
    item: unknown;
    index: number;
    readOnly: boolean;
    onRemove: (...args: unknown[]) => unknown;
    toggleExpanded: (...args: unknown[]) => unknown;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        item: unknown;
        index: number;
      },
    ];
  };
}

const TpkStackListHeadComponent: TOC<TpkStackListHeadComponentSignature> =
  <template>
    <div class='flex items-center space-x-2'>
      {{#unless @readOnly}}
        <button
          type='button'
          class='mr-8'
          data-test-delete-stackList-item
          {{on 'click' (fn @onRemove @index)}}
        >
          <img
            src='/assets/icons/trash.svg'
            class='w-6 h-6'
            alt=''
            role='none'
          />
        </button>
      {{/unless}}
      <button
        data-is-expanded-btn={{if @isExpanded 'true' 'false'}}
        type='button'
        {{on 'click' @toggleExpanded}}
        class='tpk-stack-head-expand-btn'
        data-test-toggle-stackList-item
      >
        <img

          src='/assets/icons/arrow-down.svg'
          class='w-6 h-6'
          alt=''
          role='none'
        />
      </button>
    </div>
  </template>;

export default TpkStackListHeadComponent;
