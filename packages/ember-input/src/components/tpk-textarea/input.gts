import { type TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';

export interface TpkTextareaInputComponentSignature {
  Args: {
    guid: string;
    classless?: boolean;
    value?: string;
    disabled?: boolean;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLTextAreaElement;
}

const TpkTextareaInputComponent: TOC<TpkTextareaInputComponentSignature> = <template>
    <textarea
      class={{unless @classless 'tpk-textarea-input'}}
      id={{@guid}}
      value={{@value}}
      {{on @changeEvent @onChange}}
      disabled={{@disabled}}
      ...attributes
      data-test-tpk-textarea-input
    ></textarea>
  </template>;

export default TpkTextareaInputComponent;
