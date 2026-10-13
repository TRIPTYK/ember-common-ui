import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkStackListContent = setComponentTemplate(precompileTemplate("<div data-is-expanded={{if @isExpanded \"true\" \"false\"}} class=\"origin-top transform duration-200\" data-test-content-stackList-item>\n  {{yield (hash item=@item index=@index)}}\n</div>", {
  strictMode: true,
  scope: () => ({
    hash
  })
}), templateOnly());

export { TpkStackListContent as default };
//# sourceMappingURL=content.js.map
