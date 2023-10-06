import { action } from '@ember/object';
import { BaseValidationComponent, BaseValidationSignature } from './base';
import { ComponentLike } from '@glint/template';
import TpkFileInputComponent from '@triptyk/ember-input/components/tpk-file/input';
import TpkFileLabelComponent from '@triptyk/ember-input/components/tpk-file/label';

interface TpkValidationFileComponentSignature extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    multiple?: boolean;
    classless?: boolean;
    disabled?: boolean;
    changeEvent?: 'input' | 'change';
  };
  Blocks: {
    default: [
      {
        Input: ComponentLike<TpkFileInputComponent>;
        Label: ComponentLike<TpkFileLabelComponent>;
        errors: TpkValidationFileComponent['errors'];
        hasError: TpkValidationFileComponent['hasError'];
        firstError: TpkValidationFileComponent['firstError'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationFileComponent extends BaseValidationComponent<TpkValidationFileComponentSignature> {
  @action
  onChange(file: File[]) {
    if (this.args.onChange) {
      return this.args.onChange(file);
    }
    return this.args.changeset.set(
      this.args.validationField,
      this.args.multiple === true ? file : file[0],
    );
  }

  get value() {
    return super.value;
  }
}
