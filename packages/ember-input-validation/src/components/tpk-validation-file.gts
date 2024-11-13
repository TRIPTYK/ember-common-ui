import { action } from '@ember/object';
import {
  BaseValidationComponent,
  type BaseValidationSignature,
} from './base.ts';
import type { ComponentLike } from '@glint/template';
import TpkFile from '@triptyk/ember-input/components/tpk-file';
import type TpkFileInputComponent from '@triptyk/ember-input/components/tpk-file/input';
import { hash } from '@ember/helper';
import type TpkLabel from '@triptyk/ember-input/components/tpk-label';

export interface TpkValidationFileComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    multiple?: boolean;

    disabled?: boolean;
    changeEvent?: 'input' | 'change';
  };
  Blocks: {
    default: [
      {
        Input: ComponentLike<typeof TpkFileInputComponent>;
        Label: ComponentLike<typeof TpkLabel>;
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

  <template>
    <TpkFile
      @label={{@label}}
      @onChange={{this.onChange}}
      @changeEvent={{@changeEvent}}

      @multiple={{@multiple}}
      ...attributes
      data-has-error='{{this.hasError}}'
      as |I|
    >
      {{yield
        (hash
          Input=I.Input
          Label=I.Label
          errors=this.errors
          hasError=this.hasError
          firstError=this.firstError
        )
      }}
    </TpkFile>
  </template>
}
