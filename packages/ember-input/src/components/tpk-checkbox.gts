import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent, type BaseUIComponentArgs } from './base';
import type { MergeDeep } from 'type-fest';
import TpkCheckboxLabelComponent from './tpk-checkbox/label';
import TpkCheckboxInputComponent from './tpk-checkbox/input';
import type { ComponentLike } from '@glint/template';
import { hash } from '@ember/helper';

export type TpkCheckboxArgs = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      checked?: boolean;
      disabled?: boolean;
      onChange?: (isChecked: boolean, value: string, e: Event) => unknown;
    }
  >;
  Blocks: {
    default: [
      {
        Label: ComponentLike<typeof TpkCheckboxLabelComponent>;
        Input: ComponentLike<typeof TpkCheckboxInputComponent>;
        onChange: TpkCheckboxComponent['onChange'];
        changeEvent: 'input' | 'change';
        guid: string;
      },
    ];
  };
  Element: HTMLDivElement;
};

export default class TpkCheckboxComponent extends BaseUIComponent<TpkCheckboxArgs> {
  constructor(owner: unknown, args: TpkCheckboxArgs['Args']) {
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
    <div
      class={{unless @classless 'tpk-checkbox'}}
      ...attributes
      data-test-tpk-checkbox
    >
      {{yield
        (hash
          Label=(component
            TpkCheckboxLabelComponent
            guid=this.guid
            checked=@checked
            label=@label
            classless=@classless
          )
          Input=(component
            TpkCheckboxInputComponent
            guid=this.guid
            checked=@checked
            disabled=@disabled
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
