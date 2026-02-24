import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import DeleteIcon from '../../assets/icons/delete.js';
import ChevronDownIcon from '../../assets/icons/chevron-down.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkStackListHeadComponent = setComponentTemplate(precompileTemplate("<div class=\"flex items-center space-x-2\">\n  {{#unless @readOnly}}\n    <button data-is-expanded-btn={{if @isExpanded \"true\" \"false\"}} type=\"button\" class=\"mr-8\" data-test-delete-stackList-item {{on \"click\" (fn @onRemove @index)}}>\n      <DeleteIcon class=\"size-6\" />\n    </button>\n  {{/unless}}\n  <button data-is-expanded-btn={{if @isExpanded \"true\" \"false\"}} type=\"button\" {{on \"click\" @toggleExpanded}} class=\"tpk-stack-head-expand-btn\" data-test-toggle-stackList-item>\n    <ChevronDownIcon class=\"size-6\" />\n  </button>\n</div>", {
  strictMode: true,
  scope: () => ({
    on,
    fn,
    DeleteIcon,
    ChevronDownIcon
  })
}), templateOnly());

export { TpkStackListHeadComponent as default };
//# sourceMappingURL=head.js.map
