import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from './base.ts';
import type { TpkInputSignature } from '@triptyk/ember-input/components/tpk-input';
import TpkInput from '@triptyk/ember-input/components/tpk-input';
import { hash } from '@ember/helper';

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
    default: [
      {
        Input?: TpkInputSignature['Blocks']['default'][0]['Input'];
        Label?: TpkInputSignature['Blocks']['default'][0]['Label'];
        errors: TpkValidationInputComponent['errors'];
        hasError: TpkValidationInputComponent['hasError'];
        firstError: TpkValidationInputComponent['firstError'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationInputComponent extends BaseValidationComponent<TpkValidationInputComponentSignature> {
  @tracked showPassword = false;
  @action onChange(value: string | number | Date | null) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }

  get type() {
    if (this.showPassword) {
      return '';
    }
    return this.args.type;
  }

  @action
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get value() {
    return super.value as string;
  }

  <template>
    <TpkInput
      @value={{this.value}}
      @label={{@label}}
      @type={{this.type}}
      @onChange={{this.onChange}}
      @classless={{@classless}}
      @changeEvent={{@changeEvent}}
      @mask={{@mask}}
      @maskOptions={{@maskOptions}}
      @unmaskValue={{@unmaskValue}}
      ...attributes
      data-has-error='{{this.hasError}}'
      as |I|
    >
      {{#if (has-block)}}
        {{yield
          (hash
            Input=I.Input
            Label=I.Label
            errors=this.errors
            hasError=this.hasError
            firstError=this.firstError
          )
        }}
      {{else}}
        <I.Label
          class={{unless @classless 'tpk-input-validation-label'}}
          data-test-label-not-yielded
        >
          {{@label}}
          {{#if @mandatory}}
            <span>
              *
            </span>
          {{/if}}
        </I.Label>
        <I.Input
          step={{@step}}
          min={{@min}}
          disabled={{@disabled}}
          placeholder={{@placeholder}}
          class={{unless @classless 'tpk-input-validation-input'}}
          aria-autocomplete='none'
          autocomplete='off'
          autofill='off'
          maxlength={{@maxlength}}
          data-test-input-not-yielded
        />
        {{yield
          (hash
            errors=this.errors hasError=this.hasError firstError=this.firstError
          )
        }}
      {{/if}}
      {{#if @showTogglePasswordButton}}
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
      {{/if}}
    </TpkInput>
  </template>
}
