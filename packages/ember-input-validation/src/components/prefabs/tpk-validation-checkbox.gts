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
  Element: HTMLElement;
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
      
        <V.Label class="tpk-checkbox-container"
      data-has-error='{{V.hasError}}'
      anchorScrollUp={{@validationField}}
        ...attributes data-test-tpk-checkbox>
          <MandatoryLabelComponent
          class="tpk-label" 
          @label={{@label}} 
          @mandatory={{V.mandatory}} />
          <V.Input 
          class="tpk-checkbox-input"
          data-test-tpk-checkbox-input/>
          <TpkValidationErrorsComponent
            class="tpk-validation-errors"
            @errors={{V.errors}}
          />
        </V.Label>
     
    </TpkValidationCheckboxComponent>
  </template>;

export default TpkValidationCheckboxPrefabComponent;
