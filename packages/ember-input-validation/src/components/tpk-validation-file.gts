import { action } from '@ember/object';
import {
  BaseValidationComponent,
  type BaseValidationSignature,
} from './base.ts';
import TpkFile, { type TpkFileSignature } from '@triptyk/ember-input/components/tpk-file';

import { hash } from '@ember/helper';

export interface TpkValidationFileComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    multiple?: boolean;
    disabled?: boolean;
    changeEvent?: 'input' | 'change';
    onChange?: (file: File[]) => void;
  };
  Blocks: {
    default: [
      {
        Input: TpkFileSignature['Blocks']['default'][0]['Input'];
        Label: TpkFileSignature['Blocks']['default'][0]['Label'];
        errors: TpkValidationFileComponent['errors'];
        hasError: TpkValidationFileComponent['hasError'];
        firstError: TpkValidationFileComponent['firstError'];
      },
    ];
  };
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

  <template>
    <TpkFile
      @disabled={{@disabled}}
      @label={{@label}}
      @onChange={{this.onChange}}
      @changeEvent={{@changeEvent}}
      @multiple={{@multiple}}
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
