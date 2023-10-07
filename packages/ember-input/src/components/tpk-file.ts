import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseUIComponent, BaseUIComponentArgs } from './base';
import { MergeDeep } from 'type-fest';
import { ComponentLike } from '@glint/template';
import TpkFileInputComponent from './tpk-file/input';
import TpkFileLabelComponent from './tpk-file/label';

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
        Input: ComponentLike<TpkFileInputComponent>;
        Label: ComponentLike<TpkFileLabelComponent>;
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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-file': typeof TpkFileComponent;
    TpkFile: typeof TpkFileComponent;
  }
}
