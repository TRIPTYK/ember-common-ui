/* eslint-disable no-unused-vars */
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';
import IMask, { FactoryArg, InputMask } from 'imask';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { MergeDeep } from 'type-fest';
import TpkInputInputComponent from './tpk-input/input';
import TpkInputLabelComponent from './tpk-input/label';
import { ComponentLike, WithBoundArgs } from '@glint/template';

export type TpkInputSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      type?: HTMLInputElement['type'];
      mask?: unknown;
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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-input': typeof TpkInputComponent;
    TpkInput: typeof TpkInputComponent;
  }
}
