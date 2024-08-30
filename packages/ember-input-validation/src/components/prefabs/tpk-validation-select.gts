import type { BaseValidationSignature } from "../base";
import Component from "@glimmer/component";
import TpkValidationSelectComponent, { type TpkValidationSelectComponentSignature } from "../../components/tpk-validation-select.gts";

export interface TpkValidationSelectPrefabSignature
  extends BaseValidationSignature {
  Args: TpkValidationSelectComponentSignature['Args'], 'type' | 'mask' | 'unmaskValue' | 'maskOptions' | 'mask' | 'mix' | 'max' | 'step'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}


export default class TpkValidationSelectPrefab extends Component<TpkValidationSelectPrefabSignature> {
  <template>
    <TpkValidationSelectComponent
      @label={{@label}}
      @onChange={{@onChange}}
      @classless={{@classless}}
      @changeset={{@changeset}}
      @validationField={{@validationField}}
      ...attributes
    >

    </TpkValidationSelectComponent>
  </template>
}
