import { action } from '@ember/object';
import { BaseValidationSignature, BaseValidationComponent } from './base';
import TpkSelectLabelComponent from '@triptyk/ember-input/components/tpk-select/label';
import { ComponentLike } from '@glint/template';
import TpkSelectOptionsComponent from '@triptyk/ember-input/components/tpk-select/options';
import TpkSelectButtonComponent from '@triptyk/ember-input/components/tpk-select/button';

export interface TpkValidationSelectComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    defaultText?: string;
    name?: string;
    options: unknown[];
    multiple?: boolean;
    selected?: string;
    classless?: boolean;
    changeEvent?: 'input' | 'change';
    value: string;
    disabled?: boolean;
  };
  Blocks: {
    default: [
      {
        Label: ComponentLike<TpkSelectLabelComponent>;
        Options: ComponentLike<TpkSelectOptionsComponent>;
        Button: ComponentLike<TpkSelectButtonComponent>;
        label?: string;
        selected?: string;
        hasSelection: boolean;
        errors: TpkValidationSelect['errors'];
        hasError: TpkValidationSelect['hasError'];
        firstError: TpkValidationSelect['firstError'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelect extends BaseValidationComponent<TpkValidationSelectComponentSignature> {
  @action onChange(value: unknown) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }
}
