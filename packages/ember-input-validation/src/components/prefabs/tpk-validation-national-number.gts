import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";

export interface TpkValidationNationalNumberPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationNationalNumberPrefabComponent extends BaseValidationComponent<TpkValidationNationalNumberPrefabSignature> {
  mask = "00.00.00-000.00";

  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type="text"
      @onChange={{@onChange}}
      @classless={{@classless}}
      @validationField={{@validationField}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @mask={{this.mask}}
      ...attributes
    as |V|>
      <V.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{this.mandatory}} />
      </V.Label>
      <V.Input />
      <TpkValidationErrorsComponent
        @errors={{V.errors}}
        @classless={{@classless}}
      />
    </TpkValidationInputComponent>
  </template>
}
