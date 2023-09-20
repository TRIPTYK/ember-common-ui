/* eslint-disable no-unused-vars */
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';
import IMask, { FactoryArg, FactoryOpts, InputMask } from 'imask';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

export interface TpkInputArgs extends BaseUIComponentArgs {
  type?: HTMLInputElement['type'];
  mask?: unknown;
  maskOptions?: Record<string, unknown>;
  unmaskValue?: boolean;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkInput<
  T extends TpkInputArgs,
> extends BaseUIComponent<T> {
  @tracked mask?: InputMask<FactoryArg>;

  constructor(owner: unknown, args: T) {
    super(owner, args);
    if (args.type === 'number') {
      assert(
        '@value must be a number',
        typeof args.value === 'number' || typeof args.value === 'undefined',
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

  @action onChange(e: HtmlInputEvent): void {
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
