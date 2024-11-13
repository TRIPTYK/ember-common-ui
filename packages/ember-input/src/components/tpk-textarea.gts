import { action } from '@ember/object';
import {
  BaseUIComponent,
  type BaseUIComponentArgs,
  type HtmlInputEvent,
} from './base.ts';
import type { MergeDeep } from 'type-fest';
import TpkTextareaInputComponent from './tpk-textarea/input.gts';
import TpkTextareaLabelComponent from './tpk-textarea/label.gts';
import type { WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';
import { tracked } from 'tracked-built-ins';

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
          typeof TpkTextareaLabelComponent,
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
  Element: HTMLDivElement;
};
export default class TpkTextareaComponent extends BaseUIComponent<TpkTextareaSignature> {
  @tracked charCount = 0;

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
    <div
      class='tpk-textarea'
      ...attributes
      data-test-tpk-textarea
    >
      {{yield
        (hash
          Label=(component
            TpkTextareaLabelComponent
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
    </div>
  </template>
}
