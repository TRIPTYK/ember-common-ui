import TpkValidationInputComponent, {
  type TpkValidationInputComponentSignature,
} from '../tpk-validation-input.gts';
import {
  type BaseValidationSignature,
} from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import MandatoryLabelComponent from './mandatory-label.gts';
import Component from '@glimmer/component';

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
  Element: HTMLElement;
}

export default class TpkValidationIntegerComponent extends Component<TpkValidationIntegerComponentSignature> {

get min() {
  return this.args.unsigned ? 0 : this.args.min;
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
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @mandatory={{@mandatory}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @requiredFields={{@requiredFields}}
      as |V|
    >
      <V.Label class="tpk-input" data-test-tpk-input data-has-error='{{V.hasError}}' anchorScrollUp={{@validationField}} ...attributes>
        <MandatoryLabelComponent class="label-text" @label={{@label}} @mandatory={{V.mandatory}} />
        <V.Input {{on 'keydown' this.preventNonNumericInput}} />
        <TpkValidationErrorsComponent
          @errors={{V.errors}}

        />
    </V.Label>
    </TpkValidationInputComponent>
  </template>
}
