import type { TOC } from "@ember/component/template-only";
import type { BaseValidationSignature } from "../base";
import  TpkValidationRadioGroupComponent, { type TpkValidationRadioGroupComponentSignature } from "../tpk-validation-radio-group.gts";
import TpkValidationErrorsComponent from "./tpk-validation-errors.gts";
import TpkValidationRadioPrefabComponent from "./tpk-validation-radio.gts";
import type { WithBoundArgs } from "@glint/template";

export interface TpkValidationRadioGroupPrefabComponentSignature
  extends BaseValidationSignature{
  Args: BaseValidationSignature['Args']& TpkValidationRadioGroupComponentSignature['Args'] & {
    label: string;
    groupLabel: string; 
    options: string[];
  };
  Blocks: {
    default: [
      WithBoundArgs<
        typeof TpkValidationRadioPrefabComponent,
        'selected' | 'validationField' | 'changeset' | 'classless' | 'disabled'>
    ];
  };
  element: HTMLDivElement
}

const TpkValidationRadioGroupPrefabComponent: TOC<TpkValidationRadioGroupPrefabComponentSignature> = <template>
  <TpkValidationRadioGroupComponent
    @classless={{@classless}}
    @validationField={{@validationField}}
    @changeset={{@changeset}}
    @onChange={{@onChange}}
    @mandatory={{@mandatory}}
    @groupLabel={{@groupLabel}}
    @requiredFields={{@requiredFields}}
    data-test-prefab-radio-group
    ...attributes
    as  |V|>

     {{yield (component 
      TpkValidationRadioPrefabComponent
        selected=V.selected
        validationField=@validationField
        changeset=@changeset
        classless=@classless
        disabled=@disabled
        mandatory=@mandatory
      )}}
     <TpkValidationErrorsComponent
      @errors={{V.errors}}
      @classless={{@classless}}
    />
  </TpkValidationRadioGroupComponent>
</template>

  export default TpkValidationRadioGroupPrefabComponent;