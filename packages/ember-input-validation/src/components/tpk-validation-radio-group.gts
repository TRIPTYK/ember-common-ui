import { type BaseValidationSignature, BaseValidationComponent } from './base.ts';

export interface TpkValidationRadioGroupComponentSignature
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

  <template>
    <div
      class={{unless @classless 'tpk-validation-radio-container'}}
      data-has-error='{{this.hasError}}'
      ...attributes
    >
      {{yield}}

      {{#if this.hasError}}
        {{#if (has-block 'errors')}}
          {{yield this.errors to='errors'}}
        {{else}}
          <span class={{unless @classless 'tpk-validation-radio-error'}}>
            {{this.firstErrorFormatted}}
          </span>
        {{/if}}
      {{/if}}
    </div>
  </template>
}
