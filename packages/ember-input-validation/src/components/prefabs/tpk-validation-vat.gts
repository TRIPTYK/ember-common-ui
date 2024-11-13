import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import { maskSpecialCharDefinition, getMaskForPrefixOrDefault } from "../../utils/mask-utils.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";
import Component from "@glimmer/component";


export interface TpkValidationVATPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'> & {
    mandatory: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationVATPrefabComponent extends Component<TpkValidationVATPrefabSignature> {
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

      @validationField={{@validationField}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @mandatory={{@mandatory}}
      @mask={{this.ibanMaskByCountry}}
      @maskOptions={{this.maskOptions}}
      @requiredFields={{@requiredFields}}
      anchorScrollUp={{@validationField}}
      ...attributes
    as |V|>
      <V.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{V.mandatory}} />
      </V.Label>
      <V.Input />
      <TpkValidationErrorsComponent
        @errors={{V.errors}}

      />
    </TpkValidationInputComponent>
  </template>
}
