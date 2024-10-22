import { action } from '@ember/object';
import { type BaseValidationSignature, BaseValidationComponent } from './base.ts';
import TpkRadio, { type TpkRadioSignature } from '@triptyk/ember-input/components/tpk-radio';
import { hash } from '@ember/helper';

export interface TpkValidationRadioComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    classless?: boolean;
    changeEvent?: 'input' | 'change';
    value?: string;
    disabled?: boolean;
    selected?: string;
  };
  Blocks: {
    default: [
      {
        Input: TpkRadioSignature['Blocks']['default'][0]['Input'];
        Label: TpkRadioSignature['Blocks']['default'][0]['Label'];
        errors: TpkValidationRadioComponent['errors'];
        hasError: TpkValidationRadioComponent['hasError'];
        firstError: TpkValidationRadioComponent['firstError'];
        mandatory: TpkValidationRadioComponent['mandatory'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationRadioComponent extends BaseValidationComponent<TpkValidationRadioComponentSignature> {
  @action onChange(value: string) {  
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    const changeset = this.args.changeset.set(this.args.validationField, value)
    return changeset;
  }

  get value() {
    return this.args.value
  }

  get label() {
    if(!this.args.label && !this.args.value) {
      throw new Error('label is required');
    }
    return this.args.label ?? this.args.value;
  }

  get name() {
    return this.args.validationField;
  }

  <template>
    <TpkRadio
      @selected={{@selected}}
      @value={{@value}}
      @name={{this.name}}
      @label={{this.label}}
      @classless={{@classless}}
      @changeEvent={{@changeEvent}}
      @disabled={{@disabled}}
      @onChange={{this.onChange}}
      data-has-error='{{this.hasError}}'
      ...attributes
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
    </TpkRadio>
  </template>
}
