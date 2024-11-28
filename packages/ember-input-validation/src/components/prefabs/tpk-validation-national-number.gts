import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";
import Component from "@glimmer/component";

export interface TpkValidationNationalNumberPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'>;
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class TpkValidationNationalNumberPrefabComponent extends Component<TpkValidationNationalNumberPrefabSignature> {
  mask = "00.00.00-000.00";

  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type="text"
      @onChange={{@onChange}}
      @validationField={{@validationField}}
      @mandatory={{@mandatory}}
      @changeEvent={{@changeEvent}}
      @disabled={{@disabled}}
      @changeset={{@changeset}}
      @mask={{this.mask}}
      @requiredFields={{@requiredFields}}
    as |V|>
      <V.Label
        class="tpk-national-number-container"
        data-test-tpk-prefab-national-number-container
        data-has-error='{{V.hasError}}'
        anchorScrollUp={{@validationField}}
        ...attributes
      >
          <MandatoryLabelComponent
            class="tpk-label"
            @label={{@label}}
            @mandatory={{V.mandatory}}
          />
          <V.Input
            class="tpk-national-number-input"
            data-test-tpk-national-number-input
          />
          <TpkValidationErrorsComponent
          class="tpk-validation-errors"
          @errors={{V.errors}}
          />
      </V.Label>
    </TpkValidationInputComponent>
  </template>
}
