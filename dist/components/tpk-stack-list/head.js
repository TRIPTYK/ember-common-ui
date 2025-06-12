import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkStackListHeadComponent = setComponentTemplate(precompileTemplate("\n    <div class=\"flex items-center space-x-2\">\n      {{#unless @readOnly}}\n        <button data-is-expanded-btn={{if @isExpanded \"true\" \"false\"}} type=\"button\" class=\"mr-8\" data-test-delete-stackList-item {{on \"click\" (fn @onRemove @index)}}>\n          <img src=\"/assets/icons/trash.svg\" class=\"w-6 h-6\" alt role=\"none\" />\n        </button>\n      {{/unless}}\n      <button data-is-expanded-btn={{if @isExpanded \"true\" \"false\"}} type=\"button\" {{on \"click\" @toggleExpanded}} class=\"tpk-stack-head-expand-btn\" data-test-toggle-stackList-item>\n        <img src=\"/assets/icons/arrow-down.svg\" class=\"w-6 h-6\" alt role=\"none\" />\n      </button>\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    on,
    fn
  })
}), templateOnly());

export { TpkStackListHeadComponent as default };
//# sourceMappingURL=head.js.map
