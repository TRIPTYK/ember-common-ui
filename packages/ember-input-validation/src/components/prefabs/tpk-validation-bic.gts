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
  Element: HTMLDivElement;
}

export default class TpkValidationBicPrefabComponent extends Component<TpkValidationBicPrefabSignature> {
  mask = '########[$$$]';
  maskOptions = {
    definitions: maskSpecialCharDefinition,
  };

  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type="text"
      @onChange={{@onChange}}

      @mandatory={{@mandatory}}
      @validationField={{@validationField}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @mask={{this.mask}}
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
