import { type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";
import { type TOC } from '@ember/component/template-only';
import TpkValidationFileComponent, { type TpkValidationFileComponentSignature } from "../tpk-validation-file.gts";

export interface TpkValidationFilePrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkValidationFileComponentSignature['Args'] & { mandatory: boolean };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const TpkValidationFilePrefabComponent: TOC<TpkValidationFilePrefabSignature> = <template>
    <TpkValidationFileComponent
      @label={{@label}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @mandatory={{@mandatory}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @requiredFields={{@requiredFields}}
    as |V|>
      <div class="tpk-file" data-has-error="{{V.hasError}}" data-test-tpk-file>
        <V.Label>
          <MandatoryLabelComponent @label={{@label}} />
        </V.Label>
        <V.Input />
        <TpkValidationErrorsComponent
          @errors={{V.errors}}
        />
      </div>
    </TpkValidationFileComponent>
  </template>;

export default TpkValidationFilePrefabComponent;
