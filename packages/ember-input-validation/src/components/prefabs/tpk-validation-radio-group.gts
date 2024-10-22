import type { TOC } from "@ember/component/template-only";
import type { BaseValidationSignature } from "../base";
import  TpkValidationRadioGroupComponent, { type TpkValidationRadioGroupComponentSignature } from "../tpk-validation-radio-group.gts";
import TpkValidationErrorsComponent from "./tpk-validation-errors.gts";
import type { TpkRadioSignature } from "@triptyk/ember-input/components/tpk-radio";

export interface TpkValidationRadioGroupPrefabComponentSignature
  extends BaseValidationSignature{
  Args: BaseValidationSignature['Args']& TpkValidationRadioGroupComponentSignature['Args'] & TpkRadioSignature['Args'] & {
    groupLabel: string; 
  };
  Blocks:{
    default: [
    ];
  };
  element: HTMLDivElement
}

const TpkValidationRadioGroupPrefabComponent: TOC<TpkValidationRadioGroupPrefabComponentSignature> = <template>
  {{log @label @value}}
  <TpkValidationRadioGroupComponent
    @classless={{@classless}}
    @validationField={{@validationField}}
    @changeset={{@changeset}}
    @onChange={{@onChange}}
    @mandatory={{@mandatory}}
    @groupLabel={{@groupLabel}}
    @requiredFields={{@requiredFields}}
    ...attributes
    as  |V|>
    <V.Radio @label={{@label}} @value={{@value}}/>
     <TpkValidationErrorsComponent
      @errors={{V.errors}}
      @classless={{@classless}}
    />
  </TpkValidationRadioGroupComponent>
</template>

  export default TpkValidationRadioGroupPrefabComponent;