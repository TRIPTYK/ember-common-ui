import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";
import Component from "@glimmer/component";

export interface TpkValidationNationalNumberPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationNationalNumberPrefabComponent extends Component<TpkValidationNationalNumberPrefabSignature> {
  mask = "00.00.00-000.00";

  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type="text"
      @onChange={{@onChange}}

      @validationField={{@validationField}}
      @mandatory={{@mandatory}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @mask={{this.mask}}
      @requiredFields={{@requiredFields}}
      anchorScrollUp={{@validationField}}
    as |V|>
      <div class="tpk-input" data-test-tpk-input data-has-error='{{V.hasError}}' anchorScrollUp={{@validationField}} ...attributes>
      <V.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{V.mandatory}} />
      </V.Label>
      <V.Input ...attributes />
      <TpkValidationErrorsComponent
        @errors={{V.errors}}

      />
      </div>
    </TpkValidationInputComponent>
  </template>
}
