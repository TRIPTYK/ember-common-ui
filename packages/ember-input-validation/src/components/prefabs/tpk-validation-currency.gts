import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import type { BaseValidationSignature } from "../base";
import Component from "@glimmer/component";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';

export interface TpkValidationCurrencyPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'mask' | 'unmaskValue' | 'maskOptions' | 'mask' | 'mix' | 'max' | 'step'> & {
    scale?: number;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}


export default class TpkValidationCurrencyPrefab extends Component<TpkValidationCurrencyPrefabSignature> {
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
                    }
                }
            }
        ]
    }
  }

  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type="text"
      @onChange={{@onChange}}
      @classless={{@classless}}
      @placeholder={{@placeholder}}
      @mask={{this.mask.mask}}
      @maskOptions={{this.mask}}
      @disabled={{@disabled}}
      @unmaskValue={{true}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @validationField={{@validationField}}
      ...attributes
    as |V|>
      <V.Label>
        {{@label}}
        {{#if @mandatory}}
          <span class='mandatory'>
            *
          </span>
        {{/if}}
      </V.Label>
      <V.Input placeholder={{@placeholder}} />
      <TpkValidationErrorsComponent
        @errors={{V.errors}}
        @classless={{@classless}}
      />
    </TpkValidationInputComponent>
  </template>
}
