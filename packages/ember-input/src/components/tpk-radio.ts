/* eslint-disable no-unused-vars */
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs } from './base';
import { ComponentLike } from '@glint/template';
import TpkRadioInputComponent from './tpk-radio/input';
import TpkRadioLabelComponent from './tpk-radio/label';
import { MergeDeep } from 'type-fest';

export type TpkRadioSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      checked?: boolean;
      disabled?: boolean;
      name: string;
      selected?: string;
    }
  >;
  Blocks: {
    default: [
      {
        Label: ComponentLike<TpkRadioLabelComponent>;
        Input: ComponentLike<TpkRadioInputComponent>;
        onChange: UiRadio['onChange'];
        changeEvent: 'input' | 'change';
        guid: string;
      },
    ];
  };
  Element: HTMLDivElement;
};

export default class UiRadio extends BaseUIComponent<TpkRadioSignature> {
  constructor(owner: unknown, args: TpkRadioSignature['Args']) {
    super(owner, args);
    assert('@name is required', args.name !== undefined);
    assert('@value is required', args.value !== undefined);
    assert('@label is required', args.label !== undefined);
  }

  @action
  public onChange(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    this.args.onChange?.(target.value, e);
  }
}
