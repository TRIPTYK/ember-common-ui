import TpkValidationInputComponent, { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { on } from "@ember/modifier";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";
import Component from "@glimmer/component";

export interface TpkValidationPasswordPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'unmaskValue' | 'maskOptions' | 'mask'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationPasswordPrefabComponent extends Component<TpkValidationPasswordPrefabSignature> {
  @tracked showPassword = false;

  @action
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get type() {
    return this.showPassword ? 'text' : 'password';
  }

  <template>
    <TpkValidationInputComponent
      @label={{@label}}
      @type={{this.type}}
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @mandatory={{@mandatory}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @changeset={{@changeset}}
      @validationField={{@validationField}}
      @requiredFields={{@requiredFields}}
    as |V|>
      <div class="tpk-input" data-test-tpk-input data-has-error='{{V.hasError}}' anchorScrollUp={{@validationField}} ...attributes>
        <V.Label>
          <MandatoryLabelComponent @label={{@label}} @mandatory={{V.mandatory}} />
        </V.Label>
        <div>
          <V.Input  placeholder={{@placeholder}} />
          <button
            type='button'
            class='tpk-input-validation-toggle-button'
            title={{if this.showPassword 'show' 'hide'}}
            {{on 'click' this.togglePassword}}
            data-test-toggle-button
          >
            <img
              src={{if
                this.showPassword
                '/assets/icons/eye-shut.svg'
                '/assets/icons/eye.svg'
              }}
              alt='eye'
              class='tpk-input-validation-toggle-button-image'
            />
          </button>
        </div>
        <TpkValidationErrorsComponent
          @errors={{V.errors}}

        />
      </div>
    </TpkValidationInputComponent>
  </template>
}
