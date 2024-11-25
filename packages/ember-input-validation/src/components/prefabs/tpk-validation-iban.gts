import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import { maskSpecialCharDefinition, getMaskForPrefixOrDefault } from "../../utils/mask-utils.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";
import Component from "@glimmer/component";

export interface TpkValidationIBANPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'> & {
    mandatory?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class TpkValidationIBANPrefabComponent extends Component<TpkValidationIBANPrefabSignature> {
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

  get hasMaskNotDisabled() {
    return this.args.disabled? '' : this.ibanMaskByCountry;
  }


  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type="text"
      @onChange={{@onChange}}
      @validationField={{@validationField}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @mandatory={{@mandatory}}
      @disabled={{@disabled}}
      @mask={{this.hasMaskNotDisabled}}
      @maskOptions={{this.maskOptions}}
      @requiredFields={{@requiredFields}}
    as |V|>
        <V.Label 
        class="tpk-iban-container" 
        data-test-tpk-prefab-iban-container
        data-has-error='{{V.hasError}}' 
        anchorScrollUp={{@validationField}} 
        ...attributes>
          <MandatoryLabelComponent 
          class="tpk-label" 
          @label={{@label}} 
          @mandatory={{V.mandatory}} />   
          <V.Input 
          class="tpk-iban-input"
          data-test-tpk-iban-input
          />
          <TpkValidationErrorsComponent
          class="tpk-validation-errors"
          @errors={{V.errors}}
          />
        </V.Label>
    </TpkValidationInputComponent>
  </template>
}
