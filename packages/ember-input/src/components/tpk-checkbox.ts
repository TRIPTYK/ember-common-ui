import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs } from './base';
import { MergeDeep } from 'type-fest';
import TpkCheckboxLabelComponent from './tpk-checkbox/label';
import TpkCheckboxInputComponent from './tpk-checkbox/input';
import { ComponentLike } from '@glint/template';

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
        Label: ComponentLike<TpkCheckboxLabelComponent>;
        Input: ComponentLike<TpkCheckboxInputComponent>;
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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-checkbox': typeof TpkCheckboxComponent;
    TpkCheckbox: typeof TpkCheckboxComponent;
  }
}
