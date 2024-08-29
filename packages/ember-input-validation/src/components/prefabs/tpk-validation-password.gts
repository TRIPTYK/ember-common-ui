import Component from "@glimmer/component";
import TpkValidationInputComponent from "../tpk-validation-input.gts";
import type { BaseValidationSignature } from "../base";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { on } from "@ember/modifier";

export interface TpkValidationInputComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    type?: string;
    classless?: boolean;
    mask?: string;
    maskOptions?: Record<string, unknown>;
    unmaskValue?: boolean;
    disabled?: boolean;
    changeEvent?: 'input' | 'change';
    showTogglePasswordButton?: boolean;
    step?: number;
    min?: number;
    maxlength?: number;
    mandatory?: boolean;
    placeholder?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationPasswordPrefab extends Component<TpkValidationInputComponentSignature> {
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
        @classless={{@classless}}
        @changeEvent={{@changeEvent}}
        @changeset={{@changeset}}
        @validationField={{@validationField}}
    as |V|>
      <V.Label />
      <V.Input />
      <button
        type='button'
        class={{unless @classless 'tpk-input-validation-toggle-button'}}
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
          class={{unless
            @classless
            'tpk-input-validation-toggle-button-image'
          }}
        />
      </button>
    </TpkValidationInputComponent>
  </template>
}
