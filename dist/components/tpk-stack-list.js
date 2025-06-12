import TpkStackListTitleComponent from './tpk-stack-list/title.js';
import TpkStackListContentComponent from './tpk-stack-list/content.js';
import { hash } from '@ember/helper';
import StackListItemComponent from './tpk-stack-list/item.js';
import TpkStackListHeadComponent from './tpk-stack-list/head.js';
import { on } from '@ember/modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkStackListComponent = setComponentTemplate(precompileTemplate("\n  {{#each @data key=@key as |item index|}}\n    <TpkStackListItem @zIndex={{index}} @index={{index}} as |I|>\n      <div class=\"tpk-stack-head\">\n        {{yield (hash Title=(component TpkStackListTitleComponent isExpanded=I.isExpanded item=item index=index))}}\n        <TpkStackListHead @isExpanded={{I.isExpanded}} @toggleExpanded={{I.toggleExpanded}} @item={{item}} @index={{index}} @onRemove={{@onRemove}} @readOnly={{@readOnly}} />\n      </div>\n      {{yield (hash Content=(component TpkStackListContentComponent isExpanded=I.isExpanded item=item index=index))}}\n    </TpkStackListItem>\n  {{/each}}\n  {{#unless @readOnly}}\n    <button type=\"button\" class=\"link icon {{@customButtonClass}}\" data-test-add-stackList-item {{on \"click\" @onAdd}}>\n      <img src=\"/assets/icons/plus.svg\" alt=\"add\" class=\"w-5 h-5\" />\n      <span>\n        {{@titleForAdd}}\n      </span>\n    </button>\n  {{/unless}}\n", {
  strictMode: true,
  scope: () => ({
    TpkStackListItem: StackListItemComponent,
    hash,
    TpkStackListTitleComponent,
    TpkStackListHead: TpkStackListHeadComponent,
    TpkStackListContentComponent,
    on
  })
}), templateOnly());

export { TpkStackListComponent as default };
//# sourceMappingURL=tpk-stack-list.js.map
