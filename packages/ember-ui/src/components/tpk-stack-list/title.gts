import { hash } from '@ember/helper';
import Component from '@glimmer/component';

export interface TpkStackListTitleComponentSignature {
  Args: {
    item: unknown;
    isExpanded: boolean;
  };
  Blocks: {
    default: [
      {
        item: unknown;
      },
    ];
  };
}

export default class TpkStackListTitleComponent extends Component<TpkStackListTitleComponentSignature> {
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
