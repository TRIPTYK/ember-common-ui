import TpkValidationInput, {
  type TpkValidationInputSignature,
} from '../tpk-validation-input.gts';
import { type BaseValidationSignature } from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from './mandatory-label.gts';
import Component from '@glimmer/component';

export interface TpkValidationNumberSignature extends BaseValidationSignature {
  Args: Omit<
    TpkValidationInputSignature['Args'],
    'unmaskValue' | 'maskOptions'
  > & {
    unsigned?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class TpkValidationNumberPrefab extends Component<TpkValidationNumberSignature> {
  get min() {
    return this.args.unsigned ? 0 : this.args.min;
  }

  <template>
    <TpkValidationInput
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
        class='tpk-number-container'
        data-test-tpk-prefab-number-container={{@validationField}}
        data-has-error='{{V.hasError}}'
        {{! @glint-ignore }}
        anchorScrollUp={{@validationField}}
        ...attributes
      >
        <MandatoryLabelComponent
          class='tpk-label'
          @label={{@label}}
          @mandatory={{V.mandatory}}
        />
        <V.Input class='tpk-number-input' data-test-tpk-number-input />
        <TpkValidationErrorsComponent
          class='tpk-validation-errors'
          @errors={{V.errors}}
        />
      </V.Label>
    </TpkValidationInput>
  </template>
}
