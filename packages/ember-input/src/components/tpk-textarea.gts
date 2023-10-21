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

export type TpkTextareaSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      type?: HTMLInputElement['type'];
      mask?: unknown;
      value?: string;
      disabled?: boolean;
      maskOptions?: Record<string, unknown>;
      unmaskValue?: boolean;
      onChange?: (value: string, e: Event) => unknown;
    }
  >;
  Blocks: {
    default: [
      {
        Input: WithBoundArgs<
          typeof TpkTextareaInputComponent,
          | 'classless'
          | 'guid'
          | 'value'
          | 'changeEvent'
          | 'disabled'
          | 'onChange'
        >;
        Label: WithBoundArgs<
          typeof TpkTextareaLabelComponent,
          'classless' | 'guid' | 'label'
        >;
        changeEvent: 'input' | 'change';
        onChange: (value: HtmlInputEvent, event: Event) => void;
        guid: string;
      },
    ];
  };
  Element: HTMLDivElement;
};
export default class TpkTextareaComponent extends BaseUIComponent<TpkTextareaSignature> {
  @action
  onChange(e: Event) {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    this.args.onChange?.(value, e);
  }

  <template>
    <div
      class={{unless @classless 'tpk-textarea'}}
      ...attributes
      data-test-tpk-textarea
    >
      {{yield
        (hash
          Label=(component
            TpkTextareaLabelComponent
            classless=@classless
            guid=this.guid
            label=@label
          )
          Input=(component
            TpkTextareaInputComponent
            guid=this.guid
            value=@value
            changeEvent=this.changeEvent
            classless=@classless
            disabled=@disabled
            onChange=this.onChange
          )
          changeEvent=this.changeEvent
          guid=this.guid
          onChange=this.onChange
        )
      }}
    </div>
  </template>
}