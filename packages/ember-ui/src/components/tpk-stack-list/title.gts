import { hash } from '@ember/helper';
import Component from '@glimmer/component';

export interface TpkStackListTitleSignature {
  Args: {
    item: unknown;
    isExpanded: boolean;
    index: number;
  };
  Blocks: {
    default: [
      {
        item: unknown;
      },
    ];
  };
}

export default class TpkStackListTitle extends Component<TpkStackListTitleSignature> {
  get isNotExpanded(): boolean {
    return this.args.isExpanded !== true;
  }

  <template>
    <span class='tpk-stack-title' data-test-title-stackList-item>
      {{#if this.isNotExpanded}}
        {{yield (hash item=@item)}}
      {{/if}}
    </span>
  </template>
}
