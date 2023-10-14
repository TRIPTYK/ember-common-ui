import { action } from '@ember/object';
import { type BaseValidationSignature, BaseValidationComponent } from './base';
import TpkRadioLabelComponent from '@triptyk/ember-input/components/tpk-radio/label';
import TpkRadioInputComponent from '@triptyk/ember-input/components/tpk-radio/input';
import { type ComponentLike } from '@glint/template';

export interface TpkValidationRadioComponentSignature extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    name?: string;
    classless?: boolean;
    changeEvent?: 'input' | 'change';
    value: string;
    disabled?: boolean;
  };
  Blocks: {
    default: [
      {
        Input: ComponentLike<typeof TpkRadioInputComponent>;
        Label: ComponentLike<typeof TpkRadioLabelComponent>;
        errors: TpkValidationRadioComponent['errors'];
        hasError: TpkValidationRadioComponent['hasError'];
        firstError: TpkValidationRadioComponent['firstError'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationRadioComponent extends BaseValidationComponent<TpkValidationRadioComponentSignature> {
  @action onChange(value: string) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }

  get value() {
    return super.value?.toString();
  }
}
