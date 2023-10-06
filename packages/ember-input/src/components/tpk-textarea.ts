import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';
import { MergeDeep } from 'type-fest';
import TpkTextareaInputComponent from './tpk-textarea/input';
import TpkTextareaLabelComponent from './tpk-textarea/label';
import { ComponentLike } from '@glint/template';

export type TpkTextareaSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      type?: HTMLInputElement['type'];
      mask?: unknown;
      disabled?: boolean;
      maskOptions?: Record<string, unknown>;
      unmaskValue?: boolean;
      onChange?: (value: string, e: Event) => unknown;
    }
  >;
  Blocks: {
    default: [
      {
        Input: ComponentLike<TpkTextareaInputComponent>;
        Label: ComponentLike<TpkTextareaLabelComponent>;
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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-textarea': typeof TpkTextareaComponent;
  }
}
