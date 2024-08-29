import Component from "@glimmer/component";
import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import type { BaseValidationSignature } from "../base";

export interface TpkValidationIBANPrefabSignature 
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'mask'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const maskSpecialCharDefinition = {
  '#': /[A-Z]/,
  '&': /[0-9]/,
  '$': /[A-Z0-9]/,
}

export default class TpkValidationIBANPrefab extends Component<TpkValidationIBANPrefabSignature> {
  ibanMaskByCountry = [{
    mask: 'BE&& &&&& &&&& &&&&',
    startsWith: 'BE',
    definitions: maskSpecialCharDefinition,
    lazy: false,
    country: 'Belgique'
  },{
    mask: 'FR&& &&&& &&&& &&$$ $$$$ $$$$ $&&',
    startsWith: 'FR',
    lazy: false,
    definitions: maskSpecialCharDefinition,
    country: 'France'
  },{
    mask: 'LU&& &&&$ $$$$ $$$$ $$$$',
    startsWith: 'LU',
    definitions: maskSpecialCharDefinition,
    lazy: false,
    country: 'Luxembourg'
  },{
    mask: 'NL&& #### &&&& &&&& &&',
    startsWith: 'NL',
    definitions: maskSpecialCharDefinition,
    lazy: false,
    country: 'Pays-bas'
  },{
    mask: 'DE&& &&&& &&&& &&&& &&&& &&',
    definitions: maskSpecialCharDefinition,
    startsWith: 'DE',
    lazy: false,
    country: 'Allemagne'
  }, {
    mask: '##',
    startsWith: '',
    definitions: maskSpecialCharDefinition,
    country: undefined,
  }];

  maskOptions =  {
    // @ts-expect-error
    dispatch: (appended: string, dynamicMasked) => {
      if (!dynamicMasked.rawInputValue) {
        return dynamicMasked.compiledMasks[5];
      }
      // @ts-expect-error
      const mask =  dynamicMasked.compiledMasks.find(mask => {
        return dynamicMasked.rawInputValue.slice(0, 2) === mask.startsWith;
      })
      if (!mask) {
        return dynamicMasked.compiledMasks[5];
      }
      return mask;
    },
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
      @unmaskValue={{@unmaskValue}}
      ...attributes
    as |V|>
      <V.Label />
      <V.Input />
    </TpkValidationInputComponent>
  </template>
}
