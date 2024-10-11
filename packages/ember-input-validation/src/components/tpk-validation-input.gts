import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from './base.ts';
import type { TpkInputSignature } from '@triptyk/ember-input/components/tpk-input';
import TpkInput from '@triptyk/ember-input/components/tpk-input';
import { hash } from '@ember/helper';

export interface TpkValidationInputComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkInputSignature['Args'];
  Blocks: {
    default: [
      {
        Input?: TpkInputSignature['Blocks']['default'][0]['Input'];
        Label?: TpkInputSignature['Blocks']['default'][0]['Label'];
        errors?: TpkValidationInputComponent['errors'];
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

  get value() {
    return super.value as string;
  }

  <template>
    <TpkInput
      @value={{this.value}}
      @label={{@label}}
      @type={{@type}}
      @step={{@step}}
      @min={{@min}}
      @max={{@max}}
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
      {{yield
        (hash
          Input=I.Input
          Label=I.Label
          errors=this.errors
          hasError=this.hasError
          firstError=this.firstError
        )
      }}
    </TpkInput>
  </template>
}
