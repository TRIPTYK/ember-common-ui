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
  Element: HTMLElement;
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
      <V.Label
        class="tpk-password-container"
        data-test-tpk-prefab-password-container
        data-has-error='{{V.hasError}}'
        anchorScrollUp={{@validationField}}
        ...attributes>
          <MandatoryLabelComponent
          class="tpk-label"
          @label={{@label}}
          @mandatory={{V.mandatory}}/>
          <div class="tpk-password-input-container">
            <V.Input
            class="tpk-password-input"
            data-test-tpk-password-input
            />
            {{#unless @disabled}}
            <button
              type='button'
              class='tpk-password-toggle-button'
              title={{if this.showPassword 'show' 'hide'}}
              {{on 'click' this.togglePassword}}
              data-test-tpk-password-toggle-button
            >
              <img
                src={{if
                  this.showPassword
                  '/assets/icons/eye-shut.svg'
                  '/assets/icons/eye.svg'
                }}
                data-test-tpk-password-toggle-icon
                alt='eye'
                class='tpk-password-toggle-icon'
              />
            </button>
            {{/unless}}
          </div>
          <TpkValidationErrorsComponent
          class="tpk-validation-errors"
          @errors={{V.errors}}
          />
        </V.Label>
    </TpkValidationInputComponent>
  </template>
}
