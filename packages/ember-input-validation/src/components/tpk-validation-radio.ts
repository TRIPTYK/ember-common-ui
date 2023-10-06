import { action } from '@ember/object';
import { BaseValidationSignature, BaseValidationComponent } from './base';
import TpkRadioLabelComponent from '@triptyk/ember-input/components/tpk-radio/label';
import TpkRadioInputComponent from '@triptyk/ember-input/components/tpk-radio/input';
import { ComponentLike } from '@glint/template';

interface TpkValidationRadioComponentSignature extends BaseValidationSignature {
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
        Input: ComponentLike<TpkRadioInputComponent>;
        Label: ComponentLike<TpkRadioLabelComponent>;
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
