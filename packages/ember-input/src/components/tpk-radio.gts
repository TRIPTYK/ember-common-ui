import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent, type BaseUIComponentArgs } from './base.ts';
import type { WithBoundArgs } from '@glint/template';
import TpkRadioInputComponent from './tpk-radio/input.gts';
import type { MergeDeep } from 'type-fest';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.gts';

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
        Label: WithBoundArgs<
          typeof TpkLabel,
          'guid' | 'label'
        >;
        Input: WithBoundArgs<
          typeof TpkRadioInputComponent,
          | 'guid'
          | 'selected'
          | 'disabled'
          | 'name'
          | 'value'
          | 'changeEvent'
          | 'onChange'

        >;
        onChange: TpkRadioComponent['onChange'];
        changeEvent: 'input' | 'change';
        guid: string;
      },
    ];
  };
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
    {{yield
      (hash
        Label=(component
          TpkLabel
          guid=this.guid
          label=@label
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
        )
        onChange=this.onChange
        changeEvent=this.changeEvent
        guid=this.guid
      )
    }}
  </template>
}
