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
      <div class="tpk-checkbox-container"
      data-has-error='{{V.hasError}}'
      anchorScrollUp={{@validationField}}
        ...attributes data-test-tpk-checkbox>
        <V.Label>
          <MandatoryLabelComponent
          class="tpk-label" 
          @label={{@label}} 
          @mandatory={{V.mandatory}} />
          <V.Input class="tpk-checkbox-input"/>
          <TpkValidationErrorsComponent
            class="tpk-validation-errors"
            @errors={{V.errors}}
          />
        </V.Label>
      </div>
    </TpkValidationCheckboxComponent>
  </template>;

export default TpkValidationCheckboxPrefabComponent;
