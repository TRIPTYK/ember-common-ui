import { type TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import didUpdate from '@ember/render-modifiers/modifiers/did-update';

export interface TpkTextareaInputComponentSignature {
  Args: {
    guid: string;
    classless?: boolean;
    value?: string;
    disabled?: boolean;
    maxLength?: number;
    placeholder?: string;
    updateCharacterCount: (event: Event) => void;
    setupCharacterCount: (element: HTMLTextAreaElement) => void;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLTextAreaElement;
}

const TpkTextareaInputComponent: TOC<TpkTextareaInputComponentSignature> = <template>
    <textarea
      class={{unless @classless 'tpk-textarea-input'}}
      placeholder={{@placeholder}}
      id={{@guid}}
      value={{@value}}
      maxLength={{@maxLength}}
      {{on "input" @updateCharacterCount}}
      {{didInsert @setupCharacterCount}}
      {{didUpdate @setupCharacterCount @value}}
      {{on @changeEvent @onChange}}
      disabled={{@disabled}}
      ...attributes
      data-test-tpk-textarea-input
    ></textarea>
  </template>;

export default TpkTextareaInputComponent;
