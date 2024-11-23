import TpkValidationCheckboxComponent, { type TpkValidationCheckboxComponentSignature } from "../tpk-validation-checkbox.gts";
import { type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";
import { type TOC } from '@ember/component/template-only';

export interface TpkValidationCheckboxPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkValidationCheckboxComponentSignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const TpkValidationCheckboxPrefabComponent: TOC<TpkValidationCheckboxPrefabSignature> = <template>
    <TpkValidationCheckboxComponent
      @label={{@label}}
      @changeset={{@changeset}}
      @validationField={{@validationField}}
      @changeEvent={{@changeEvent}}
      @mandatory={{@mandatory}}
      @disabled={{@disabled}}
      @onChange={{@onChange}}
      @requiredFields={{@requiredFields}}
    as |V|>
      <div
          class='tpk-checkbox'
          anchorScrollUp={{@validationField}}
          ...attributes
          data-test-tpk-checkbox
        >
      <V.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{V.mandatory}} />
      </V.Label>
      <V.Input />
      <TpkValidationErrorsComponent
        @errors={{V.errors}}

      />
      </div>
    </TpkValidationCheckboxComponent>
  </template>;

export default TpkValidationCheckboxPrefabComponent;
