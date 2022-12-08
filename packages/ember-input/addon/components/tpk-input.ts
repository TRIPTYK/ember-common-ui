/* eslint-disable no-unused-vars */
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';
import IMask from 'imask';
import { tracked } from '@glimmer/tracking';

export interface TpkInputArgs extends BaseUIComponentArgs {
  type?: string;
  mask?: string;
  maskOptions?: IMask.AnyMaskedOptionsArray;
  unmaskValue?: boolean;
}

export interface OptionMask {
  mask: string;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkInput<
  T extends TpkInputArgs
> extends BaseUIComponent<T> {
  @tracked declare mask: IMask.InputMask<IMask.AnyMaskedOptions>;

  @action
  setMask(element: HTMLElement) {
    if (!this.args.mask) return;
    const input = element.querySelector(`#${this.guid}`) as HTMLElement;
    if (!input) return;
    let options = {
      mask: this.args.mask as string,
    };
    if (this.args.maskOptions) {
      options = {
        ...options,
        ...this.args.maskOptions,
      };
    }

    this.mask = IMask(input, options);
  }

  @action onChange(e: HtmlInputEvent): void {
    e.preventDefault();
    let value = e.target?.value;
    if (this.mask) {
      value = this.args.unmaskValue ? this.mask.unmaskedValue : this.mask.value;
    }
    this.args.onChange?.(value, e);
  }
}
