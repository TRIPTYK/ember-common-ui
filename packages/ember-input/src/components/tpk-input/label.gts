import { type TOC } from '@ember/component/template-only';

export interface TpkInputLabelComponentSignature {
  Args: {
    guid: string;
    label: string;

  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [string] | [];
  };
}

const TpkInputLabelComponent: TOC<TpkInputLabelComponentSignature> = <template>
  <label
    class='tpk-input-label'
    for={{@guid}}
    ...attributes
    data-test-tpk-input-label
  >
    {{#if (has-block)}}
      {{yield}}
    {{else}}
      {{@label}}
    {{/if}}
  </label>
</template>;

export default TpkInputLabelComponent;
