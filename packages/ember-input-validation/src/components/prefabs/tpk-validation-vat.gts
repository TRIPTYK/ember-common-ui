import Component from "@glimmer/component";
import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import type { BaseValidationSignature } from "../base";
import { maskSpecialCharDefinition, getMaskForPrefixOrDefault } from "../../utils/mask-utils.ts";


export interface TpkValidationVATPrefabSignature 
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationVATPrefab extends Component<TpkValidationVATPrefabSignature> {
  ibanMaskByCountry = [{
    mask: 'BE&&&&&&&&&&',
    startsWith: 'BE',
    definitions: maskSpecialCharDefinition,
    lazy: false,
  },{
    mask: 'FR$$&&&&&&&&&',
    startsWith: 'FR',
    lazy: false,
    definitions: maskSpecialCharDefinition,
  },{
    mask: 'LU&&&&&&&&',
    startsWith: 'LU',
    definitions: maskSpecialCharDefinition,
    lazy: false,
  },{
    mask: 'NL&&&&&&&&&B&&',
    startsWith: 'NL',
    definitions: maskSpecialCharDefinition,
    lazy: false,
  },{
    mask: 'DE&&&&&&&&&',
    definitions: maskSpecialCharDefinition,
    startsWith: 'DE',
    lazy: false,
  },{
    mask: '##',
    startsWith: '',
    default: true,
    definitions: maskSpecialCharDefinition,
  }];

  maskOptions =  {
    dispatch: getMaskForPrefixOrDefault,
  };
  

  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type="text"
      @onChange={{@onChange}}
      @classless={{@classless}}
      @validationField={{@validationField}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @mask={{this.ibanMaskByCountry}}
      @maskOptions={{this.maskOptions}}
      ...attributes
    as |V|>
      <V.Label />
      <V.Input />
    </TpkValidationInputComponent>
  </template>
}
