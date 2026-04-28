import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { type BaseValidationSignature, BaseValidation } from './base.ts';
import type { TpkInputSignature } from '@triptyk/ember-input/components/tpk-input';
import TpkInput from '@triptyk/ember-input/components/tpk-input';
import { hash } from '@ember/helper';

export interface TpkValidationInputSignature extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] &
    TpkInputSignature['Args'] & {
      onChange?: (value: string | number | Date | null, e: Event) => void;
    };
  Blocks: {
    default: [
      {
        Input?: TpkInputSignature['Blocks']['default'][0]['Input'];
        Label?: TpkInputSignature['Blocks']['default'][0]['Label'];
        errors?: TpkValidationInput['errors'];
        hasError: TpkValidationInput['hasError'];
        firstError: TpkValidationInput['firstError'];
        mandatory: TpkValidationInput['mandatory'];
      },
    ];
  };
}

export default class TpkValidationInput extends BaseValidation<TpkValidationInputSignature> {
  @tracked showPassword = false;

  @action onChange(value: string | number | Date | null, e: Event) {
    if (this.args.onChange) {
      return this.args.onChange(value, e);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }

  get value() {
    return super.value as string;
  }

  <template>
    <TpkInput
      @value={{this.value}}
      @disabled={{@disabled}}
      @label={{@label}}
      @type={{@type}}
      @step={{@step}}
      @min={{@min}}
      @max={{@max}}
      @onChange={{this.onChange}}
      @changeEvent={{@changeEvent}}
      @mask={{@mask}}
      @maskOptions={{@maskOptions}}
      @unmaskValue={{@unmaskValue}}
      @placeholder={{@placeholder}}
      as |I|
    >
      {{yield
        (hash
          Input=I.Input
          Label=I.Label
          errors=this.errors
          hasError=this.hasError
          firstError=this.firstError
          mandatory=this.mandatory
        )
      }}
    </TpkInput>
  </template>
}
