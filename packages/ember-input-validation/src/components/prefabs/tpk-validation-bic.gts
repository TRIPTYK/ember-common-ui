import Component from "@glimmer/component";
import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import type { BaseValidationSignature } from "../base";
import { maskSpecialCharDefinition } from "../../utils/mask-utils.ts";

export interface TpkValidationBicPrefabSignature 
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationBicPrefab extends Component<TpkValidationBicPrefabSignature> {
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
      <V.Label />
      <V.Input />
    </TpkValidationInputComponent>
  </template>
}
