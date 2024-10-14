import TpkValidationInputComponent, {
  type TpkValidationInputComponentSignature,
} from '../tpk-validation-input.gts';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from './mandatory-label.gts';

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

export default class TpkValidationNumberPrefabComponent extends BaseValidationComponent<TpkValidationNumberComponentSignature> {

get min() {
  return this.args.unsigned ? 0 : this.args.min;
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
      data-has-error='{{this.hasError}}'
      ...attributes
      data-test-input='number'
      as |I|
    >
      <I.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{this.mandatory}} />
      </I.Label>
      <I.Input />
      <TpkValidationErrorsComponent
        @errors={{I.errors}}
        @classless={{@classless}}
      />
    </TpkValidationInputComponent>
  </template>
}
