import { TOC } from '@ember/component/template-only';

export interface TpkTextareaLabelComponentSignature {
  Args: {
    guid: string;
    label: string;
    classless?: boolean;
  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

const TpkTextareaLabelComponent: TOC<TpkTextareaLabelComponentSignature> = <template>
    <label
      for={{@guid}}
      class={{unless @classless 'tpk-textarea-label'}}
      ...attributes
      data-test-tpk-textarea-label
    >
      {{#if (has-block)}}
        {{yield}}
      {{else}}
        {{@label}}
      {{/if}}
    </label>
  </template>;

export default TpkTextareaLabelComponent;
