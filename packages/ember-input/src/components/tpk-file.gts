import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseUIComponent, type BaseUIComponentArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import type { WithBoundArgs } from '@glint/template';
import TpkFileInputComponent from './tpk-file/input.gts';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.gts';

export type TpkFileSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      accept?: string;
      multiple?: boolean;
      disabled?: boolean;
      onChange?: (value: File[], e: Event) => unknown;
    }
  >;
  Blocks: {
    default: [
      {
        Input: WithBoundArgs<
          typeof TpkFileInputComponent,
          'onChange' | 'accept' | 'disabled' | 'changeEvent' | 'guid'
        >;
        Label: WithBoundArgs<
          typeof TpkLabel,
          'label' | 'guid'
        >;
        guid: string;
        changeEvent: 'input' | 'change';
        onChange: TpkFileComponent['onChange'];
        files: TpkFileComponent['files'];
      },
    ];
  };
  Element: HTMLDivElement;
};

export default class TpkFileComponent extends BaseUIComponent<TpkFileSignature> {
  @tracked files: File[] = [];

  @action onChange(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files ?? []);
    this.files = files;
    this.args.onChange?.(files, e);
  }

  <template>
    <div
      class='tpk-file'
      ...attributes
      data-test-tpk-file
    >
      {{yield
        (hash
          Input=(component
            TpkFileInputComponent
            onChange=this.onChange
            accept=@accept
            disabled=@disabled
            multiple=@multiple
            changeEvent=this.changeEvent
            guid=this.guid
          )
          Label=(component
            TpkLabel
            label=@label
            onChange=this.onChange
            guid=this.guid
          )
          changeEvent=this.changeEvent
          onChange=this.onChange
          guid=this.guid
          files=this.files
        )
      }}
    </div>
  </template>
}
