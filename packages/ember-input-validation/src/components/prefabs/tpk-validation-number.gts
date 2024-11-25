import TpkValidationInputComponent, {
  type TpkValidationInputComponentSignature,
} from '../tpk-validation-input.gts';
import {
  type BaseValidationSignature
} from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from './mandatory-label.gts';
import Component from '@glimmer/component';

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

export default class TpkValidationNumberPrefabComponent extends Component<TpkValidationNumberComponentSignature> {

get min() {
  return this.args.unsigned ? 0 : this.args.min;
}

  <template>
    <TpkValidationInputComponent
      @type='number'
      @label={{@label}}
      @min={{this.min}}
      @step={{@step}}
      @disabled={{@disabled}}
      @mandatory={{@mandatory}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @requiredFields={{@requiredFields}}
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
