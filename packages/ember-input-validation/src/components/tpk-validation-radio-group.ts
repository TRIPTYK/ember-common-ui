import { BaseValidationSignature, BaseValidationComponent } from './base';

interface TpkValidationRadioGroupComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    classless?: boolean;
    unmaskValue?: boolean;
    disabled?: boolean;
    changeEvent?: 'input' | 'change';
  };
  Blocks: {
    default: [];
    errors: [TpkValidationRadioGroupComponent['errors']];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationRadioGroupComponent extends BaseValidationComponent<TpkValidationRadioGroupComponentSignature> {
  get firstErrorFormatted() {
    return super.firstError?.toString();
  }
}
