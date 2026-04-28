import type { TOC } from '@ember/component/template-only';

export interface MandatoryLabelSignature {
  Args: {
    label: string;
    mandatory?: boolean;
  };
  Element: HTMLSpanElement;
}

const MandatoryLabel: TOC<MandatoryLabelSignature> = <template>
  <div ...attributes>
    <span>
      {{@label}}
      {{#if @mandatory}}
        <span class='mandatory'>*</span>
      {{/if}}
    </span>
  </div>
</template>;

export default MandatoryLabel;
