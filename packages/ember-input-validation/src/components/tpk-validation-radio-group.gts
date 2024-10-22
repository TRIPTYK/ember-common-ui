import { action } from '@ember/object';
import { type BaseValidationSignature, BaseValidationComponent } from './base.ts';
import TpkRadio, { type TpkRadioSignature } from '@triptyk/ember-input/components/tpk-radio';
import { hash } from '@ember/helper';
import type { WithBoundArgs } from '@glint/template';
import { assert } from '@ember/debug';

export interface TpkValidationRadioGroupComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    classless?: boolean;
    groupLabel?: string;
    disabled?: boolean;
  } & TpkRadioSignature['Args'];
  Blocks: {
    default: [
      {
        Radio: WithBoundArgs<
          typeof TpkRadio,
          'classless' | 'selected' | 'disabled' | 'name' | 'value' | 'changeEvent' | 'onChange' | 'checked'>; 
        onChange: TpkValidationRadioGroupComponent['onChange'];
        errors: TpkValidationRadioGroupComponent['errors'];
        hasError: TpkValidationRadioGroupComponent['hasError'];
        firstError: TpkValidationRadioGroupComponent['firstError'];
        mandatory: TpkValidationRadioGroupComponent['mandatory'];
      },      
    ]
  }
  Element: HTMLDivElement;
}
 
export default class TpkValidationRadioGroupComponent extends BaseValidationComponent<TpkValidationRadioGroupComponentSignature> {
  
  @action onChange(value: string) {  
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    const changeset = this.args.changeset.set(this.args.validationField, value);
    return changeset
  }

  get selected(){
    if(this.args.changeset.get(this.args.validationField)) {
      assert('The changeset value must be a string', typeof this.args.changeset.get(this.args.validationField) === 'string');
      return this.args.changeset.get(this.args.validationField) as string;
    }
    return undefined
  }
  
  <template>
    <div
      class={{unless @classless 'tpk-validation-radio-container'}}
      data-has-error='{{this.hasError}}'
      ...attributes
    >
      <div class={{unless @classless 'tpk-validation-radio-group-label'}}>
        {{@groupLabel}}
      </div>
      
      {{yield (hash 
          Radio=(component 
            TpkRadio
            classless=@classless
            disabled=@disabled
            name=@validationField
            onChange=this.onChange
            selected=this.selected
          )
          onChange=this.onChange
          errors=this.errors
          hasError=this.hasError
          firstError=this.firstError
          mandatory=this.mandatory
        )
      }}
    </div>
  </template>
}
