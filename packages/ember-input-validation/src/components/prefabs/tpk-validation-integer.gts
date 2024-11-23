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
  Element: HTMLDivElement;
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
      anchorScrollUp={{@validationField}}
      data-test-input='integer'
      {{on 'keydown' this.preventNonNumericInput}}
      as |I|
    >
      <div class="tpk-input" data-test-tpk-input data-has-error='{{I.hasError}}' anchorScrollUp={{@validationField}} ...attributes>
        <I.Label>
          <MandatoryLabelComponent @label={{@label}} @mandatory={{I.mandatory}} />
        </I.Label>
        <I.Input ...attributes />
        <TpkValidationErrorsComponent
          @errors={{I.errors}}

        />
    </div>
    </TpkValidationInputComponent>
  </template>
}
