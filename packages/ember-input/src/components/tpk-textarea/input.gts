import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { modifier, type FunctionBasedModifier } from 'ember-modifier';
import type { EmptyObject } from 'type-fest';

export interface TpkTextareaInputComponentSignature {
  Args: {
    guid: string;

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

export default class TpkTextareaInputComponent extends Component<TpkTextareaInputComponentSignature> {
  setupCharCount: FunctionBasedModifier<{
    Args: {
        Positional: unknown[];
        Named: EmptyObject;
    };
    Element: HTMLTextAreaElement;
  }> = modifier((element: HTMLTextAreaElement) => {
    this.args.setupCharacterCount(element);
  });

  <template>
    <textarea
      placeholder={{@placeholder}}
      id={{@guid}}
      value={{@value}}
      maxlength={{@maxLength}}
      {{on 'input' @updateCharacterCount}}
      {{this.setupCharCount}}
      {{on @changeEvent @onChange}}
      disabled={{@disabled}}
      ...attributes
      data-test-tpk-textarea-input
    ></textarea>
  </template>
}
