import TpkValidationInputComponent, {
  type TpkValidationInputComponentSignature,
} from '../tpk-validation-input.gts';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';

export interface TpkValidationNumberComponentSignature
  extends BaseValidationSignature {
  Args: Omit<
    TpkValidationInputComponentSignature['Args'],
    | 'unmaskValue'
    | 'maskOptions'
  > & {
    unsigned?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationNumberComponent extends BaseValidationComponent<TpkValidationNumberComponentSignature> {

get min() {
  return this.args.unsigned ? 0 : undefined;
}

  <template>
    <TpkValidationInputComponent
      @type='number'
      @label={{@label}}
      @min={{this.min}}
      @step={{@step}}
      @classless={{@classless}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @mandatory={{@mandatory}}
      data-has-error='{{this.hasError}}'
      ...attributes
      data-test-input='number'
      as |I|
    >
      <I.Label />
      <I.Input />
      <TpkValidationErrorsComponent
        @errors={{I.errors}}
        @classless={{@classless}}
      />
    </TpkValidationInputComponent>
  </template>
}
