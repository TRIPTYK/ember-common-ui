import TpkValidationInputComponent, {
  type TpkValidationInputComponentSignature,
} from '../tpk-validation-input.gts';
import { type BaseValidationSignature } from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from './mandatory-label.gts';
import Component from '@glimmer/component';

export interface TpkValidationCurrencyPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<
    TpkValidationInputComponentSignature['Args'],
    | 'type'
    | 'mask'
    | 'unmaskValue'
    | 'maskOptions'
    | 'mask'
    | 'mix'
    | 'max'
    | 'step'
  > & {
    scale?: number;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationCurrencyPrefabComponent extends Component<TpkValidationCurrencyPrefabSignature> {
  get mask() {
    return {
      mask: [
        { mask: '' },
        {
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
        },
      ],
    };
  }

  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type='text'
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @mask={{this.mask.mask}}
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
      <div
        class='tpk-input'
        data-test-tpk-input
        data-has-error='{{V.hasError}}'
        anchorScrollUp={{@validationField}}
        ...attributes
      >
        <V.Label>
          <MandatoryLabelComponent
            @label={{@label}}
            @mandatory={{V.mandatory}}
          />
        </V.Label>
        <V.Input placeholder={{@placeholder}} />
        <TpkValidationErrorsComponent @errors={{V.errors}} />
      </div>
    </TpkValidationInputComponent>
  </template>
}
