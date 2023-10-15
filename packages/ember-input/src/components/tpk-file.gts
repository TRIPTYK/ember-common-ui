import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseUIComponent, type BaseUIComponentArgs } from './base';
import type { MergeDeep } from 'type-fest';
import type { ComponentLike } from '@glint/template';
import TpkFileInputComponent from './tpk-file/input';
import TpkFileLabelComponent from './tpk-file/label';
import { hash } from '@ember/helper';

export type TpkFileSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      accept?: string;
      disabled?: boolean;
      onChange?: (value: File[], e: Event) => unknown;
    }
  >;
  Blocks: {
    default: [
      {
        Input: ComponentLike<typeof TpkFileInputComponent>;
        Label: ComponentLike<typeof TpkFileLabelComponent>;
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
      class={{unless @classless 'tpk-file'}}
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
            changeEvent=this.changeEvent
            guid=this.guid
            classless=@classless
          )
          Label=(component
            TpkFileLabelComponent
            label=@label
            onChange=this.onChange
            guid=this.guid
            classless=@classless
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
