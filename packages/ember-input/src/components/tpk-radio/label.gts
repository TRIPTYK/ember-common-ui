import { type TOC } from '@ember/component/template-only';

export interface TpkRadioLabelComponentSignature {
  Args: {
    guid: string;
    label: string;

  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

const TpkRadioLabelComponent: TOC<TpkRadioLabelComponentSignature> = <template>
  <label
    class='tpk-radio-label'
    for={{@guid}}
    ...attributes
    data-test-tpk-radio-label
  >
    {{#if (has-block)}}
      {{yield}}
    {{else}}
      {{@label}}
    {{/if}}
  </label>
</template>;

export default TpkRadioLabelComponent;
