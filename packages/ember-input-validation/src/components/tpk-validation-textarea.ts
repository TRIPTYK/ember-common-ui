import { action } from '@ember/object';
import { BaseValidationComponent, BaseValidationSignature } from './base';
import TpkTextareaInputComponent from '@triptyk/ember-input/components/tpk-textarea/input';
import TpkTextareaLabelComponent from '@triptyk/ember-input/components/tpk-textarea/label';
import { ComponentLike } from '@glint/template';

interface TpkValidationTextareaComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    classless?: boolean;
    disabled?: boolean;
    changeEvent?: 'input' | 'change';
  };
  Blocks: {
    default: [
      {
        Label: ComponentLike<TpkTextareaLabelComponent>;
        Input: ComponentLike<TpkTextareaInputComponent>;
        errors: TpkValidationTextareaComponent['errors'];
        hasError: TpkValidationTextareaComponent['hasError'];
        firstError: TpkValidationTextareaComponent['firstError'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationTextareaComponent extends BaseValidationComponent<TpkValidationTextareaComponentSignature> {
  @action onChange(e: string) {
    if (this.args.onChange) {
      return this.args.onChange(e);
    }
    return this.args.changeset.set(this.args.validationField, e);
  }

  get value() {
    return super.value?.toString();
  }
}
