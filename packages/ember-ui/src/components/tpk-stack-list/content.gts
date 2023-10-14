import { TOC } from '@ember/component/template-only';
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

const TpkStackListContentComponent: TOC<TpkStackListComponentSignature> =
  <template>
    <div
      class='origin-top transform duration-200
        {{if @isExpanded "h-full scale-y-100" "h-0 scale-y-0"}}'
      data-test-content-stackList-item
    >
      {{yield (hash item=@item index=@index)}}
    </div>
  </template>;

export default TpkStackListContentComponent;
