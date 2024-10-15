import type { TOC } from '@ember/component/template-only';

export interface MandatoryLabelComponentSignature {
  Args: {
    label?: string;
    mandatory?: boolean;
  };
  Element: HTMLSpanElement;
}

const MandatoryLabelComponent: TOC<MandatoryLabelComponentSignature> = <template>
  {{@label}}
  {{#if @mandatory}}
    <span class="mandatory" ...attributes>
      *
    </span>
  {{/if}}
</template>;

export default MandatoryLabelComponent;
