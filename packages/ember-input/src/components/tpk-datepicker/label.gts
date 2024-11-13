import { type TOC } from '@ember/component/template-only';

export interface TpkInputLabelComponentSignature {
  Args: {
    guid: string;
    label: string;

  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

const TpkDatepickerLabelComponent: TOC<TpkInputLabelComponentSignature> = <template>
    <label
      class='tpk-datepicker-label'
      for={{@guid}}
      ...attributes
      data-test-tpk-datepicker-label
    >
      {{#if (has-block)}}
        {{yield}}
      {{else}}
        {{@label}}
      {{/if}}
    </label>
  </template>;

export default TpkDatepickerLabelComponent;
