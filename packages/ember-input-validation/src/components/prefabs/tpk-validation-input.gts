import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { assert } from "@ember/debug";
import MandatoryLabelComponent from "./mandatory-label.gts";
import Component from "@glimmer/component";

export interface TpkValidationInputPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkValidationInputComponentSignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationInputPrefabComponent extends Component<TpkValidationInputPrefabSignature> {
  constructor(owner: unknown, args: TpkValidationInputPrefabSignature['Args']) {
    super(owner, args);
    assert(
      'If you want use integer args, use TpkValidationInputIntegerPrefab',
      typeof args.min === 'undefined' || typeof args.max === 'undefined' || typeof args.step === 'undefined',
    );
  }
  <template>
    <TpkValidationInputComponent
      @type={{@type}}
      @label={{@label}}
      @classless={{@classless}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @mask={{@mask}}
      @mandatory={{@mandatory}}
      @maskOptions={{@maskOptions}}
      @unmaskValue={{@unmaskValue}}
      @changeset={{@changeset}}
      @requiredFields={{@requiredFields}}
      ...attributes
    as |V|>
      <V.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{V.mandatory}} />
      </V.Label>
      <V.Input />
      <TpkValidationErrorsComponent
        @errors={{V.errors}}
        @classless={{@classless}}
      />
    </TpkValidationInputComponent>
  </template>
}
