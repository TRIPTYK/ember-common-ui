import {
  BaseUIComponent,
  type BaseUIComponentArgs
} from './base.ts';
import { assert } from '@ember/debug';
import type { MergeDeep } from 'type-fest';
import TpkInputInputComponent from './tpk-input/input.gts';
import type { WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.gts';

export type TpkInputSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      value?: string | number | boolean | null | undefined;
      type?: HTMLInputElement['type'];
      mask?: unknown;
      min?: number;
      step?: number;
      max?: number;
      placeholder?: string;
      disabled?: boolean;
      maskOptions?: Record<string, unknown>;
      unmaskValue?: boolean;
      onChange?: (value: string | number | Date | null, e: Event) => unknown;
    }
  >;
  Blocks: {
    default: [
      {
        Input: WithBoundArgs<
          typeof TpkInputInputComponent,
          | 'value'
          | 'onChange'
          | 'type'
          | 'changeEvent'
          | 'disabled'
          | 'guid'

          | 'min'
          | 'step'
          | 'max'
        >;
        Label: WithBoundArgs<
          typeof TpkLabel,
          'label' | 'guid'
        >;
        changeEvent: 'input' | 'change';
        guid: string;
      },
    ];
  };
};

export default class TpkInputComponent extends BaseUIComponent<TpkInputSignature> {
  constructor(owner: unknown, args: TpkInputSignature['Args']) {
    super(owner, args);

    assert(
      '@label must be a string',
      typeof args.label === 'string',
    );

    if (args.type === 'number') {
      assert(
        '@value must be a number',
        typeof args.value === 'number' ||
          args.value === undefined ||
          args.value === null,
      );
    }
  }

  <template>
    {{yield
      (hash
        Input=(component
          TpkInputInputComponent
          onChange=@onChange
          type=@type
          mask=@mask
          maskOptions=@maskOptions
          unmaskValue=@unmaskValue
          placeholder=@placeholder
          changeEvent=this.changeEvent
          min=@min
          step=@step
          max=@max
          value=@value
          disabled=@disabled
          guid=this.guid
        )
        Label=(component
          TpkLabel
          label=@label
          guid=this.guid
        )
        changeEvent=this.changeEvent
        guid=this.guid
      )
    }}
  </template>
}
