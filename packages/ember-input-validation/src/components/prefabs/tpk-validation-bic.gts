import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import { maskSpecialCharDefinition } from "../../utils/mask-utils.ts";
import MandatoryLabelComponent from "./mandatory-label.gts";
import Component from "@glimmer/component";
import TpkValidationErrorsComponent from "./tpk-validation-errors.gts";

export interface TpkValidationBicPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'>;
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class TpkValidationBicPrefabComponent extends Component<TpkValidationBicPrefabSignature> {
  mask = '########[$$$]';
  maskOptions = {
    definitions: maskSpecialCharDefinition,
  };

  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @disabled={{@disabled}}
      @type="text"
      @onChange={{@onChange}}
      @mandatory={{@mandatory}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @mask={{this.mask}}
      @maskOptions={{this.maskOptions}}
      @requiredFields={{@requiredFields}}
    as |V|>
        <V.Label 
        class="tpk-bic-container" 
        data-test-tpk-prefab-bic-container
        data-has-error='{{V.hasError}}' 
        anchorScrollUp={{@validationField}} 
        ...attributes>
          <MandatoryLabelComponent  
          class="tpk-label" 
          @label={{@label}} 
          @mandatory={{V.mandatory}}/>
          <V.Input 
          class="tpk-bic-input" 
          data-test-tpk-bic-input
          />
          <TpkValidationErrorsComponent
          class="tpk-validation-errors"
          @errors={{V.errors}}
          />
        </V.Label>
    </TpkValidationInputComponent>
  </template>
}
