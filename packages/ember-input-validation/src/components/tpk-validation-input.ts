import { action } from '@ember/object';
import { BaseValidationSignature, BaseValidationComponent } from './base';
import TpkInputInputComponent from '@triptyk/ember-input/components/tpk-input/input';
import TpkInputLabelComponent from '@triptyk/ember-input/components/tpk-input/label';
import { ComponentLike } from '@glint/template';

export interface TpkValidationInputComponentSignature extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    type?: string;
    classless?: boolean;
    mask?: string;
    maskOptions?: Record<string, unknown>;
    unmaskValue?: boolean;
    disabled?: boolean;
    changeEvent?: 'input' | 'change';
  };
  Blocks: {
    default: [
      {
        Input: ComponentLike<TpkInputInputComponent>;
        Label: ComponentLike<TpkInputLabelComponent>;
        errors: TpkValidationInputComponent['errors'];
        hasError: TpkValidationInputComponent['hasError'];
        firstError: TpkValidationInputComponent['firstError'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationInputComponent extends BaseValidationComponent<TpkValidationInputComponentSignature> {
  @action onChange(value: string | number | Date | null) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }

  get value() {
    return super.value as string;
  }
}
