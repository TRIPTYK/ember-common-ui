import type { TOC } from '@ember/component/template-only';

export interface MandatoryLabelComponentSignature {
  Args: {
    label?: string;
    mandatory?: boolean;
  };
  Element: HTMLSpanElement;
}

const MandatoryLabelComponent: TOC<MandatoryLabelComponentSignature> = <template>
    <div ...attributes>
      <span>
          {{@label}}
          {{#if @mandatory}}
            <span class="mandatory">*</span>
          {{/if}}
      </span>
    </div>
</template>;

export default MandatoryLabelComponent;
