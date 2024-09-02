import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import type { BaseUIComponentArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import type { WithBoundArgs } from '@glint/template';
import TpkDatepickerNewInputComponent from './tpk-datepicker-new/input.gts';
import TpkDatepickerLabelComponent from './tpk-datepicker/label.gts';
import { hash } from '@ember/helper';
import IMask from 'imask';
import { action } from '@ember/object';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

export type TpkDatepickerSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      value: Date[] | Date | string | string[] | null | number;
      onChange?: (value: Date[], e: Event) => void;
      disabled?: boolean;
      mask?: string;
    }
  >;
  Blocks: {
    default: [
      {
        Input: any;
        Label: WithBoundArgs<
          typeof TpkDatepickerLabelComponent,
          'guid' | 'classless' | 'label'
        >;
        guid: string;
      },
    ];
  };
  Element: HTMLDivElement;
};

export default class TpkDatepicker extends Component<TpkDatepickerSignature> {
  guid = guidFor(this);

  @action
  setMask(element: HTMLElement) {
    if (!this.args.mask) return;

    const inputElement = element.querySelector(
      `input#${this.guid}`,
    ) as HTMLElement;

    IMask(inputElement, {
      mask: this.args.mask,
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 9999,
        },
      },
      lazy: true,
      overwrite: true,
      autofix: true,
    });
  }

  <template>
    <div
      class={{unless @classless 'tpk-datepicker'}}
      {{didInsert this.setMask}}
      ...attributes
      data-test-tpk-datepicker
    >
      {{yield
        (hash
          Input=(component
            TpkDatepickerNewInputComponent
            onChange=@onChange
            value=@value
            guid=this.guid
            disabled=@disabled
          )
          Label=(component
            TpkDatepickerLabelComponent
            guid=this.guid
            classless=@classless
            label=@label
          )
          guid=this.guid
        )
      }}
    </div>
  </template>
}
