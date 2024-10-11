import TpkValidationCheckboxComponent, { type TpkValidationCheckboxComponentSignature } from "../tpk-validation-checkbox.gts";
import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';

export interface TpkValidationInputPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkValidationCheckboxComponentSignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationInputPrefab extends BaseValidationComponent<TpkValidationInputPrefabSignature> {
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
        {{@label}}
        {{#if @mandatory}}
          <span class='mandatory'>
            *
          </span>
        {{/if}}
      </V.Label>
      <V.Input />
      <TpkValidationErrorsComponent
        @errors={{V.errors}}
        @classless={{@classless}}
      />
    </TpkValidationCheckboxComponent>
  </template>
}
