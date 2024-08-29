import { action } from '@ember/object';
import {
  BaseUIComponent,
  type BaseUIComponentArgs,
  type HtmlInputEvent,
} from './base.ts';
import IMask, { type FactoryArg, InputMask } from 'imask';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import type { MergeDeep } from 'type-fest';
import TpkInputInputComponent from './tpk-input/input.gts';
import TpkInputLabelComponent from './tpk-input/label.gts';
import type { WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import didUpdate from '@ember/render-modifiers/modifiers/did-update';
import { on } from '@ember/modifier';

export type TpkInputSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      value?: string | number | boolean | null | undefined;
      type?: HTMLInputElement['type'];
      mask?: unknown;
      placeholder?: string;
      disabled?: boolean;
      maskOptions?: Record<string, unknown>;
      unmaskValue?: boolean;
      onChange?: (value: string | number | Date | null, e: Event) => unknown;
    }
  >;
  Blocks: {
    default: [
      {
        Input: WithBoundArgs<
          typeof TpkInputInputComponent,
          | 'value'
          | 'onChange'
          | 'type'
          | 'changeEvent'
          | 'disabled'
          | 'guid'
          | 'classless'
        >;
        Label: WithBoundArgs<
          typeof TpkInputLabelComponent,
          'label' | 'guid' | 'classless'
        >;
        changeEvent: 'input' | 'change';
        onChange: (value: HtmlInputEvent, event: Event) => void;
        guid: string;
      },
    ];
  };
  Element: HTMLDivElement;
};

export default class TpkInputComponent extends BaseUIComponent<TpkInputSignature> {
  @tracked mask?: InputMask<FactoryArg>;

  constructor(owner: unknown, args: TpkInputSignature['Args']) {
    super(owner, args);
    if (args.type === 'number') {
      assert(
        '@value must be a number',
        typeof args.value === 'number' ||
          args.value === undefined ||
          args.value === null,
      );
    }
  }

  @action
  setMask(element: HTMLElement) {
    if (!this.args.mask) return;

    const inputElement = element.querySelector(
      `input#${this.guid}`,
    ) as HTMLElement;

    this.mask = IMask(inputElement, {
      mask: this.args.mask,
      ...this.args.maskOptions,
    } as never);
  }

  @action onChange(e: Event): void {
    e.preventDefault();
    let value = this.inputValue(e.target as HTMLInputElement);
    if (this.mask) {
      value = this.args.unmaskValue ? this.mask.unmaskedValue : this.mask.value;
    }
    this.args.onChange?.(value, e);
  }

  private inputValue(input: HTMLInputElement) {
    if (this.args.type === 'number') {
      return input.valueAsNumber;
    }

    if (this.args.type === 'date') {
      return input.valueAsDate;
    }

    return input.value;
  }

  <template>
    <div
      class={{unless @classless 'tpk-input'}}
      {{didInsert this.setMask}}
      {{didUpdate this.setMask @mask}}
      ...attributes
      data-test-tpk-input
    >

      {{#if (has-block)}}
        {{yield
          (hash
            Input=(component
              TpkInputInputComponent
              onChange=this.onChange
              type=@type
              placeholder=@placeholder
              changeEvent=this.changeEvent
              value=@value
              disabled=@disabled
              guid=this.guid
              classless=@classless
            )
            Label=(component
              TpkInputLabelComponent
              label=@label
              guid=this.guid
              classless=@classless
            )
            changeEvent=this.changeEvent
            guid=this.guid
            onChange=this.onChange
          )
        }}
      {{else}}
        <TpkInputLabelComponent
          @label={{@label}}
          @guid={{this.guid}}
          @classless={{@classless}}
        />
        <TpkInputInputComponent
          @onChange={{this.onChange}}
          @type={{@type}}
          @changeEvent={{this.changeEvent}}
          @value={{@value}}
          @disabled={{@disabled}}
          @guid={{this.guid}}
          @classless={{@classless}}
        />
      {{/if}}

    </div>
  </template>
}
