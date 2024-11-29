import { action } from '@ember/object';
import {
  BaseUIComponent,
  type BaseUIComponentArgs,
  type HtmlInputEvent,
} from './base.ts';
import type { MergeDeep } from 'type-fest';
import TpkTextareaInputComponent from './tpk-textarea/input.gts';
import type { WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';
import { tracked } from 'tracked-built-ins';
import TpkLabel from './tpk-label.gts';
import { assert } from '@ember/debug';

export type TpkTextareaSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      value?: string;
      placeholder?: string;
      disabled?: boolean;
      onChange?: (value: string, e: Event) => unknown;
      maxLength?: number;
    }
  >;
  Blocks: {
    default: [
      {
        Input: WithBoundArgs<
          typeof TpkTextareaInputComponent,

          | 'guid'
          | 'value'
          | 'changeEvent'
          | 'disabled'
          | 'onChange'
          | 'placeholder'
          | 'updateCharacterCount'
          | 'setupCharacterCount'
          | 'maxLength'
        >;
        Label: WithBoundArgs<
          typeof TpkLabel,
          'guid' | 'label'
        >;
        changeEvent: 'input' | 'change';
        onChange: (value: HtmlInputEvent, event: Event) => void;
        guid: string;
        charCount: number;
        maxLength?: number;
      },
    ];
  };
};
export default class TpkTextareaComponent extends BaseUIComponent<TpkTextareaSignature> {
  @tracked charCount = 0;

  public constructor(owner: unknown, args: TpkTextareaSignature['Args']) {
    super(owner, args);
    assert('@label must be a string', typeof args.label === 'string');
  }

  @action
  onChange(e: Event) {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    this.args.onChange?.(value, e);
  }

  @action
  updateCharacterCount(e: Event) {
    const { value } = e.target as HTMLTextAreaElement;
    this.charCount = value.length;
  }

  @action
  setupCharacterCount(e: HTMLTextAreaElement) {
    this.charCount = e.value.length;
  }

  <template>
    {{yield
      (hash
        Label=(component
          TpkLabel
          guid=this.guid
          label=@label
        )
        Input=(component
          TpkTextareaInputComponent
          guid=this.guid
          value=@value
          updateCharacterCount=this.updateCharacterCount
          setupCharacterCount=this.setupCharacterCount
          maxLength=@maxLength
          changeEvent=this.changeEvent
          placeholder=@placeholder
          disabled=@disabled
          onChange=this.onChange
        )
        charCount=this.charCount
        maxLength=@maxLength
        changeEvent=this.changeEvent
        guid=this.guid
        onChange=this.onChange
      )
    }}
  </template>
}
