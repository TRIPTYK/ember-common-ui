import TpkStackListTitle from './tpk-stack-list/title.js';
import TpkStackListContent from './tpk-stack-list/content.js';
import { hash } from '@ember/helper';
import StackListItem from './tpk-stack-list/item.js';
import TpkStackListHead from './tpk-stack-list/head.js';
import { on } from '@ember/modifier';
import PlusIcon from '../assets/icons/plus.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const defaultsToFalse = value => {
  return value ?? false;
};
const TpkStackList = setComponentTemplate(precompileTemplate("{{#each @data key=@key as |item index|}}\n  <TpkStackListItem @zIndex={{index}} @index={{index}} as |I|>\n    <div class=\"tpk-stack-head\">\n      {{yield (hash Title=(component TpkStackListTitleComponent isExpanded=I.isExpanded item=item index=index))}}\n      <TpkStackListHead @isExpanded={{I.isExpanded}} @toggleExpanded={{I.toggleExpanded}} @item={{item}} @index={{index}} @onRemove={{@onRemove}} @readOnly={{defaultsToFalse @readOnly}} />\n    </div>\n    {{yield (hash Content=(component TpkStackListContentComponent isExpanded=I.isExpanded item=item index=index))}}\n  </TpkStackListItem>\n{{/each}}\n{{#unless @readOnly}}\n  <button type=\"button\" class=\"link icon {{@customButtonClass}}\" data-test-add-stackList-item {{on \"click\" @onAdd}}>\n    <PlusIcon class=\"size-6\" />\n    <span>\n      {{@titleForAdd}}\n    </span>\n  </button>\n{{/unless}}", {
  strictMode: true,
  scope: () => ({
    TpkStackListItem: StackListItem,
    hash,
    TpkStackListTitleComponent: TpkStackListTitle,
    TpkStackListHead,
    defaultsToFalse,
    TpkStackListContentComponent: TpkStackListContent,
    on,
    PlusIcon
  })
}), templateOnly());

export { TpkStackList as default };
//# sourceMappingURL=tpk-stack-list.js.map
