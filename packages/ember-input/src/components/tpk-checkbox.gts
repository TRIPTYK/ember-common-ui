import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUI, type BaseUIArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import TpkCheckboxInputComponent from './tpk-checkbox-input.gts';
import type { WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.gts';
import type Owner from '@ember/owner';

export type TpkCheckboxSignature = {
  Args: MergeDeep<
    BaseUIArgs['Args'],
    {
      checked?: boolean;
      disabled?: boolean;
      onChange?: (isChecked: boolean, value: string, e: Event) => unknown;
    }
  >;
  Blocks: {
    default: [
      {
        Label: WithBoundArgs<typeof TpkLabel, 'guid' | 'label'>;
        Input: WithBoundArgs<
          typeof TpkCheckboxInputComponent,
          'changeEvent' | 'onChange' | 'guid' | 'checked'
        >;
        onChange: TpkCheckbox['onChange'];
        changeEvent: 'input' | 'change';
        guid: string;
      },
    ];
  };
};

export default class TpkCheckbox extends BaseUI<TpkCheckboxSignature> {
  constructor(owner: Owner, args: TpkCheckboxSignature['Args']) {
    super(owner, args);
    assert('@checked is required', typeof args.checked === 'boolean');
    assert('@label is required', args.label !== undefined);
  }

  @action
  public onChange(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    this.args.onChange?.(target.checked, target.value, e);
  }

  <template>
    {{yield
      (hash
        Label=(component TpkLabel guid=this.guid checked=@checked label=@label)
        Input=(component
          TpkCheckboxInputComponent
          guid=this.guid
          checked=@checked
          disabled=@disabled
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
