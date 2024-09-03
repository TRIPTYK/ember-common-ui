import TpkValidationInputComponent, {
  type TpkValidationInputComponentSignature,
} from '../tpk-validation-input.gts';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

export interface TpkValidationIntegerComponentSignature
  extends BaseValidationSignature {
  Args: Omit<
    TpkValidationInputComponentSignature['Args'],
    | 'step'
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

export default class TpkValidationIntegerComponent extends BaseValidationComponent<TpkValidationIntegerComponentSignature> {

get min() {
  return this.args.unsigned ? 0 : undefined;
}
  
@action
preventNonNumericInput(event: KeyboardEvent) {
  if(event.key ==="." || event.key === ","){
    event.preventDefault(); 
  }
}

  <template>
    <TpkValidationInputComponent
      @type='number'
      @label={{@label}}
      @min={{this.min}}
      @step={{1}}
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
      data-test-input='integer'
      {{on 'keydown' this.preventNonNumericInput}}
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
