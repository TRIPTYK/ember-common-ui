import type { TOC } from '@ember/component/template-only';

export interface MandatorySelectLabelTextSignature {
  Args: {
    labelText?: string;
    mandatory?: boolean;
  };
  Element: HTMLSpanElement;
}

const MandatorySelectLabelText: TOC<MandatorySelectLabelTextSignature> =
  <template>
    <span ...attributes>
      {{@labelText}}
      {{#if @mandatory}}
        <span class='mandatory'>*</span>
      {{/if}}
    </span>
  </template>;

export default MandatorySelectLabelText;
