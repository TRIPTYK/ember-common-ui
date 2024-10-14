import TpkValidationCheckboxComponent, { type TpkValidationCheckboxComponentSignature } from "../tpk-validation-checkbox.gts";
import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";

export interface TpkValidationCheckboxPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkValidationCheckboxComponentSignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationCheckboxPrefabComponent extends BaseValidationComponent<TpkValidationCheckboxPrefabSignature> {
  <template>
    <TpkValidationCheckboxComponent
      @label={{@label}}
      @classless={{@classless}}
      @changeset={{@changeset}}
      @validationField={{@validationField}}
      @changeEvent={{@changeEvent}}
      @disabled={{@disabled}}
      @onChange={{@onChange}}
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
    </TpkValidationCheckboxComponent>
  </template>
}
