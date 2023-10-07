import { action } from '@ember/object';
import { BaseValidationSignature, BaseValidationComponent } from './base';
import { assert } from '@ember/debug';
import { ComponentLike } from '@glint/template';
import TpkCheckboxInputComponent from '@triptyk/ember-input/components/tpk-checkbox/input';
import TpkCheckboxLabelComponent from '@triptyk/ember-input/components/tpk-checkbox/label';

interface TpkValidationCheckboxComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    classless?: boolean;
    changeEvent?: 'input' | 'change';
    disabled?: boolean;
  };
  Blocks: {
    default: [
      {
        Input: ComponentLike<TpkCheckboxInputComponent>;
        Label: ComponentLike<TpkCheckboxLabelComponent>;
        errors: TpkValidationCheckboxComponent['errors'];
        hasError: TpkValidationCheckboxComponent['hasError'];
        firstError: TpkValidationCheckboxComponent['firstError'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationCheckboxComponent extends BaseValidationComponent<TpkValidationCheckboxComponentSignature> {
  @action
  onChange(checked: boolean) {
    if (this.args.onChange) {
      return this.args.onChange(checked);
    }
    return this.args.changeset.set(this.args.validationField, checked);
  }

  get value() {
    assert(
      'value must be a boolean or null or undefined',
      typeof super.value === 'boolean' ||
        super.value === null ||
        super.value === undefined,
    );
    return super.value ?? false;
  }
}
