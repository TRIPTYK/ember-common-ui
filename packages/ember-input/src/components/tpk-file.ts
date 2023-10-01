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
    }
  >;
  Blocks: {
    default: [
      {
        Input: ComponentLike<TpkFileInputComponent>;
        Label: ComponentLike<TpkFileLabelComponent>;
        guid: string;
        changeEvent: 'input' | 'change';
        onChange: TpkFile['onChange'];
        files: TpkFile['files'];
      },
    ];
  };
  Element: HTMLDivElement;
};

export default class TpkFile extends BaseUIComponent<TpkFileSignature> {
  @tracked files: File[] = [];

  @action onChange(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files ?? []);
    this.files = files;
    this.args.onChange?.(files, e);
  }
}
