import type { TOC } from '@ember/component/template-only';

export interface TpkCheckboxLabelComponentSignature {
  Args: {
    guid: string;
    label: string;

  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

const TpkCheckboxLabelComponent: TOC<TpkCheckboxLabelComponentSignature> = <template>
    <label
      class='tpk-checkbox-label'
      for={{@guid}}
      ...attributes
      data-test-tpk-checkbox-label
    >
      {{#if (has-block)}}
        {{yield}}
      {{else}}
        {{@label}}
      {{/if}}
    </label>
  </template>;

export default TpkCheckboxLabelComponent;
