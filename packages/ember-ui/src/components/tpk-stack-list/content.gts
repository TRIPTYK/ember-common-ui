import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';

export interface TpkStackListComponentSignature {
  Args: {
    isExpanded: boolean;
    item: unknown;
    index: number;
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

const TpkStackListContentComponent: TOC<TpkStackListComponentSignature> = <template>
    <div
      data-is-expanded={{if @isExpanded 'true' 'false'}}
      class='origin-top transform duration-200'
      data-test-content-stackList-item
    >
      {{yield (hash item=@item index=@index)}}
    </div>
  </template>;

export default TpkStackListContentComponent;
