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
    @validationField={{@validationField}}
    @label={{@label}}
    @changeset={{@changeset}}
    @onChange={{@onChange}}
    @mandatory={{@mandatory}}
    @groupLabel={{@groupLabel}}
    @requiredFields={{@requiredFields}}
    as |V|>
    <fieldset class="tpk-radio-group-container"
      data-has-error='{{V.hasError}}'
      anchorScrollUp={{@validationField}}
      data-test-tpk-prefab-radio-group-container
    >
      <legend class="tpk-radio-group-label">{{@groupLabel}}*</legend>
      {{yield (component
        TpkValidationRadioPrefabComponent
          selected=V.selected
          validationField=@validationField
          changeset=@changeset
          disabled=@disabled
          mandatory=@mandatory
        )}}
      <TpkValidationErrorsComponent
        class="tpk-validation-errors"
        @errors={{V.errors}}
      />
    </fieldset>
  </TpkValidationRadioGroupComponent>
</template>

  export default TpkValidationRadioGroupPrefabComponent;
