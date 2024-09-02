import Component from "@glimmer/component";
import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import type { BaseValidationSignature } from "../base";
import { maskSpecialCharDefinition, getMaskForPrefixOrDefault } from "../../utils/mask-utils.ts";

export interface TpkValidationNationalNumberPrefabSignature 
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationNationalNumberPrefab extends Component<TpkValidationNationalNumberPrefabSignature> {
  mask = "00.00.00-000.00";

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
      ...attributes
    as |V|>
      <V.Label />
      <V.Input />
    </TpkValidationInputComponent>
  </template>
}
