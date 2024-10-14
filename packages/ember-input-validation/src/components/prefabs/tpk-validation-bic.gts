import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import { maskSpecialCharDefinition } from "../../utils/mask-utils.ts";
import MandatoryLabelComponent from "./mandatory-label.gts";

export interface TpkValidationBicPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationBicPrefabComponent extends BaseValidationComponent<TpkValidationBicPrefabSignature> {
  mask = '########[$$$]';
  maskOptions = {
    definitions: maskSpecialCharDefinition,
  };

  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type="text"
      @onChange={{@onChange}}
      @classless={{@classless}}
      @mandatory={{@mandatory}}
      @validationField={{@validationField}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @mask={{this.mask}}
      @maskOptions={{this.maskOptions}}
      ...attributes
    as |V|>
      <V.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{this.mandatory}} />
      </V.Label>
      <V.Input />
    </TpkValidationInputComponent>
  </template>
}
