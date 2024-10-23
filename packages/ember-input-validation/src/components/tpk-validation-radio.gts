import { action } from '@ember/object';
import { type BaseValidationSignature, BaseValidationComponent } from './base.ts';
import TpkRadio, { type TpkRadioSignature } from '@triptyk/ember-input/components/tpk-radio';
import { hash } from '@ember/helper';

export interface TpkValidationRadioComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    name?: string;
    classless?: boolean;
    changeEvent?: 'input' | 'change';
    value: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
  };
  Blocks: {
    default: [
      {
        Input: TpkRadioSignature['Blocks']['default'][0]['Input'];
        Label: TpkRadioSignature['Blocks']['default'][0]['Label'];
        errors: TpkValidationRadioComponent['errors'];
        hasError: TpkValidationRadioComponent['hasError'];
        firstError: TpkValidationRadioComponent['firstError'];
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
    return this.args.changeset.set(this.args.validationField, value);
  }

  get value() {
    return super.value?.toString();
  }

  <template>
    <TpkRadio
      @selected={{this.value}}
      @value={{@value}}
      @name={{if @name @name @validationField}}
      @label={{@label}}
      @classless={{@classless}}
      @changeEvent={{@changeEvent}}
      @disabled={{@disabled}}
      @onChange={{this.onChange}}
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
        )
      }}
    </TpkRadio>
  </template>
}
