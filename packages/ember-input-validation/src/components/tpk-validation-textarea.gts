import { action } from '@ember/object';
import {
  BaseValidationComponent,
  type BaseValidationSignature,
} from './base.ts';
import TpkTextarea, { type TpkTextareaSignature } from '@triptyk/ember-input/components/tpk-textarea';
import { hash } from '@ember/helper';

export interface TpkValidationTextareaComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkTextareaSignature['Args'];
  Blocks: {
    default: [
      {
        Label: TpkTextareaSignature['Blocks']['default'][0]['Label'];
        Input: TpkTextareaSignature['Blocks']['default'][0]['Input'];
        errors: TpkValidationTextareaComponent['errors'];
        hasError: TpkValidationTextareaComponent['hasError'];
        firstError: TpkValidationTextareaComponent['firstError'];
        mandatory: TpkValidationTextareaComponent['mandatory'];
        charCount: number;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationTextareaComponent extends BaseValidationComponent<TpkValidationTextareaComponentSignature> {
  @action onChange(e: string) {
    if (this.args.onChange) {
      return this.args.onChange(e);
    }
    return this.args.changeset.set(this.args.validationField, e);
  }

  get value() {
    return super.value?.toString();
  }

  <template>
    <TpkTextarea
      @value={{this.value}}
      @label={{@label}}

      @disabled={{@disabled}}
      @maxLength={{@maxLength}}
      @changeEvent={{@changeEvent}}
      @onChange={{this.onChange}}
      ...attributes
      data-has-error='{{this.hasError}}'
      as |I|
    >
      {{yield
        (hash
          Input=I.Input
          Label=I.Label
          charCount=I.charCount
          errors=this.errors
          hasError=this.hasError
          firstError=this.firstError
          mandatory=this.mandatory
        )
      }}
    </TpkTextarea>
  </template>
}
