import { type TOC } from '@ember/component/template-only';

export interface TpkFileLabelComponentSignature {
  Args: {
    guid: string;
    label: string;

  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

const TpkFileLabelComponent: TOC<TpkFileLabelComponentSignature> = <template>
  <label
    class='tpk-file-label'
    for={{@guid}}
    ...attributes
    data-test-tpk-file-label
  >
    {{#if (has-block)}}
      {{yield}}
    {{else}}
      {{@label}}
    {{/if}}
  </label>
</template>;

export default TpkFileLabelComponent;
