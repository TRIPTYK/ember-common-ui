import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { assert } from "@ember/debug";
import MandatoryLabelComponent from "./mandatory-label.gts";
import Component from "@glimmer/component";

export interface TpkValidationInputPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkValidationInputComponentSignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class TpkValidationInputPrefabComponent extends Component<TpkValidationInputPrefabSignature> {
  constructor(owner: unknown, args: TpkValidationInputPrefabSignature['Args']) {
    super(owner, args);
    assert(
      'If you want use integer args, use TpkValidationInputIntegerPrefab',
      typeof args.min === 'undefined' || typeof args.max === 'undefined' || typeof args.step === 'undefined',
    );
  }
  <template>
    <TpkValidationInputComponent
      @type={{@type}}
      @label={{@label}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @mask={{@mask}}
      @mandatory={{@mandatory}}
      @maskOptions={{@maskOptions}}
      @unmaskValue={{@unmaskValue}}
      @changeset={{@changeset}}
      @requiredFields={{@requiredFields}}
    as |V|>
      <V.Label 
      class="tpk-input-container" 
      data-test-tpk-prefab-input-container 
      data-has-error='{{V.hasError}}' 
      anchorScrollUp={{@validationField}} 
      ...attributes>
        <MandatoryLabelComponent 
        class="tpk-label" 
        @label={{@label}} 
        @mandatory={{V.mandatory}} />
        <V.Input 
        class="tpk-input-input" 
        data-test-tpk-input-input/>
        <TpkValidationErrorsComponent
          class="tpk-validation-errors"
          @errors={{V.errors}}
        />
      </V.Label>
    </TpkValidationInputComponent>
  </template>
}
