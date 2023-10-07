/* eslint-disable no-unused-vars */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { BaseUIComponentArgs } from './base';
import { MergeDeep } from 'type-fest';
import { ComponentLike } from '@glint/template';
import TpkDatepickerInputComponent, {
  FlatpickerArgs,
} from './tpk-datepicker/input';
import TpkDatepickerLabelComponent from './tpk-datepicker/label';

export type TpkDatepickerSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      value?: Date[] | Date | string | string[];
      onChange?: (value: Date[], e: Event) => void;
      disabled?: boolean;
    } & FlatpickerArgs
  >;
  Blocks: {
    default: [
      {
        Input: ComponentLike<TpkDatepickerInputComponent>;
        Label: ComponentLike<TpkDatepickerLabelComponent>;
        guid: string;
      },
    ];
  };
  Element: HTMLDivElement;
};

export default class TpkDatepicker extends Component<TpkDatepickerSignature> {
  guid = guidFor(this);

  get dateFormat() {
    return this.args.dateFormat ? this.args.dateFormat : 'd/m/Y';
  }

  get onClose() {
    return this.args.onClose ? this.args.onClose : this.args.onChange;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-datepicker': typeof TpkDatepicker;
    TpkDatepicker: typeof TpkDatepicker;
  }
}
