import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import { maskSpecialCharDefinition, getMaskForPrefixOrDefault } from "../../utils/mask-utils.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";
import Component from "@glimmer/component";
import { action } from "@ember/object";

export interface TpkValidationIBANPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'> & {
    mandatory?: boolean;
    onChange?: (value: string, e: Event) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class TpkValidationIBANPrefabComponent extends Component<TpkValidationIBANPrefabSignature> {
  ibanMaskByCountry = [{
    mask: '$$&& &&&& &&&& &&&&',
    startsWith: 'BE',
    definitions: maskSpecialCharDefinition,
    lazy: false,
  },{
    mask: '$$&& &&&& &&&& &&$$ $$$$ $$$$ $&&',
    startsWith: 'FR',
    lazy: false,
    definitions: maskSpecialCharDefinition,
  },{
    mask: '$$&& &&&$ $$$$ $$$$ $$$$',
    startsWith: 'LU',
    definitions: maskSpecialCharDefinition,
    lazy: false,
  },{
    mask: '$$&& #### &&&& &&&& &&',
    startsWith: 'NL',
    definitions: maskSpecialCharDefinition,
    lazy: false,
  },{
    mask: '$$&& &&&& &&&& &&&& &&&& &&',
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

  @action
  onChange(value: string | number | Date | null, e: Event){  
    const valueAsString = (value as string).toUpperCase()
    if(this.args.onChange){
      return this.args.onChange(valueAsString, e);
    }
    return this.args.changeset.set(this.args.validationField, valueAsString);
  }


  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type="text"
      @onChange={{this.onChange}}
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
          class="tpk-iban-input uppercase"
         
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
