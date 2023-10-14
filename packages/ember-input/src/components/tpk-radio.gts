/* eslint-disable no-unused-vars */
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent, type BaseUIComponentArgs } from './base';
import type { ComponentLike } from '@glint/template';
import TpkRadioInputComponent from './tpk-radio/input';
import TpkRadioLabelComponent from './tpk-radio/label';
import { type MergeDeep } from 'type-fest';
import { hash } from '@ember/helper';

export type TpkRadioSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      value?: string;
      checked?: boolean;
      disabled?: boolean;
      name: string;
      selected?: string;
      onChange?: (value: string, e: Event) => unknown;
    }
  >;
  Blocks: {
    default: [
      {
        Label: ComponentLike<typeof TpkRadioLabelComponent>;
        Input: ComponentLike<typeof TpkRadioInputComponent>;
        onChange: TpkRadioComponent['onChange'];
        changeEvent: 'input' | 'change';
        guid: string;
      },
    ];
  };
  Element: HTMLDivElement;
};

export default class TpkRadioComponent extends BaseUIComponent<TpkRadioSignature> {
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

  <template>
    <div
      class={{unless @classless 'tpk-radio'}}
      ...attributes
      data-test-tpk-radio
    >
      {{yield
        (hash
          Label=(component
            TpkRadioLabelComponent guid=this.guid label=@label classless=@classless
          )
          Input=(component
            TpkRadioInputComponent
            guid=this.guid
            selected=@selected
            disabled=@disabled
            name=@name
            value=@value
            changeEvent=this.changeEvent
            onChange=this.onChange
            classless=@classless
          )
          onChange=this.onChange
          changeEvent=this.changeEvent
          guid=this.guid
        )
      }}
    </div>
  </template>
}
