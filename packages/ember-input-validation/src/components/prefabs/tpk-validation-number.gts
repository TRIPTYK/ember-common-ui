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
  Element: HTMLElement;
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
      as |V|
    >
      <V.Label
      class="tpk-number-container"
      data-test-tpk-prefab-number-container
      data-has-error='{{V.hasError}}'
      anchorScrollUp={{@validationField}}
      ...attributes>
        <MandatoryLabelComponent
        class="tpk-label"
        @label={{@label}}
        @mandatory={{V.mandatory}} />
        <V.Input
        class="tpk-number-input"
        data-test-tpk-number-input
        />
        <TpkValidationErrorsComponent
          class="tpk-validation-errors"
          @errors={{V.errors}}
        />
      </V.Label>
    </TpkValidationInputComponent>
  </template>
}
