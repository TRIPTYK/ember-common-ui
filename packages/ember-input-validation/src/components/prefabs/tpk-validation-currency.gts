import TpkValidationInput, {
  type TpkValidationInputSignature,
} from '../tpk-validation-input.gts';
import { type BaseValidationSignature } from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from './mandatory-label.gts';
import Component from '@glimmer/component';

export interface TpkValidationCurrencyPrefabSignature extends BaseValidationSignature {
  Args: Omit<
    TpkValidationInputSignature['Args'],
    'type' | 'mask' | 'unmaskValue' | 'maskOptions' | 'mix' | 'max' | 'step'
  > & {
    scale?: number;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class TpkValidationCurrencyPrefab extends Component<TpkValidationCurrencyPrefabSignature> {
  get mask() {
    return {
      mask: 'num €',
      lazy: false,
      blocks: {
        num: {
          expose: true,
          mask: Number,
          scale: this.args.scale ?? 2,
          thousandsSeparator: ' ',
          padFractionalZeros: true,
          radix: '.',
          mapToRadix: ['.', ','],
        },
      },
    };
  }

  <template>
    <TpkValidationInput
      @label={{@label}}
      @type='text'
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @mask={{this.mask}}
      @maskOptions={{this.mask}}
      @disabled={{@disabled}}
      @unmaskValue={{true}}
      @mandatory={{@mandatory}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @validationField={{@validationField}}
      @requiredFields={{@requiredFields}}
      as |V|
    >
      <V.Label
        class='tpk-currency-container'
        data-test-tpk-prefab-currency-container={{@validationField}}
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
        <V.Input
          placeholder={{@placeholder}}
          data-test-tpk-currency-input
          class='tpk-currency-input'
        />
        <TpkValidationErrorsComponent
          class='tpk-validation-errors'
          @errors={{V.errors}}
        />
      </V.Label>
    </TpkValidationInput>
  </template>
}
