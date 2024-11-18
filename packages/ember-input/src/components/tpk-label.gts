import { type TOC } from '@ember/component/template-only';

export interface TpkLabelSignature {
  Args: {
    guid: string;
    label: string;

  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

const TpkLabel: TOC<TpkLabelSignature> = <template>
  <label
    class='tpk-label'
    for={{@guid}}
    ...attributes
    data-test-tpk-label
  >
    {{#if (has-block)}}
      {{yield}}
    {{else}}
      {{@label}}
    {{/if}}
  </label>
</template>;

export default TpkLabel;
