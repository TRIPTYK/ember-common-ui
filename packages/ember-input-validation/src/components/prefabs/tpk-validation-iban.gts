import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import { maskSpecialCharDefinition, getMaskForPrefixOrDefault } from "../../utils/mask-utils.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";

export interface TpkValidationIBANPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'> & {
    mandatory: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationIBANPrefabComponent extends BaseValidationComponent<TpkValidationIBANPrefabSignature> {
  ibanMaskByCountry = [{
    mask: 'BE&& &&&& &&&& &&&&',
    startsWith: 'BE',
    definitions: maskSpecialCharDefinition,
    lazy: false,
  },{
    mask: 'FR&& &&&& &&&& &&$$ $$$$ $$$$ $&&',
    startsWith: 'FR',
    lazy: false,
    definitions: maskSpecialCharDefinition,
  },{
    mask: 'LU&& &&&$ $$$$ $$$$ $$$$',
    startsWith: 'LU',
    definitions: maskSpecialCharDefinition,
    lazy: false,
  },{
    mask: 'NL&& #### &&&& &&&& &&',
    startsWith: 'NL',
    definitions: maskSpecialCharDefinition,
    lazy: false,
  },{
    mask: 'DE&& &&&& &&&& &&&& &&&& &&',
    definitions: maskSpecialCharDefinition,
    startsWith: 'DE',
    lazy: false,
  }, {
    mask: '##',
    startsWith: '',
    default: true,
    definitions: maskSpecialCharDefinition,
    lazy: false,
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
