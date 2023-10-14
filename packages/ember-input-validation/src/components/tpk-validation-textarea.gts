import { action } from '@ember/object';
import { BaseValidationComponent, type BaseValidationSignature } from './base';
import TpkTextarea from '@triptyk/ember-input/components/tpk-textarea';
import TpkTextareaInputComponent from '@triptyk/ember-input/components/tpk-textarea/input';
import TpkTextareaLabelComponent from '@triptyk/ember-input/components/tpk-textarea/label';
import { type ComponentLike } from '@glint/template';
import { hash } from '@ember/helper';

export interface TpkValidationTextareaComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    classless?: boolean;
    disabled?: boolean;
    changeEvent?: 'input' | 'change';
  };
  Blocks: {
    default: [
      {
        Label: ComponentLike<typeof TpkTextareaLabelComponent>;
        Input: ComponentLike<typeof TpkTextareaInputComponent>;
        errors: TpkValidationTextareaComponent['errors'];
        hasError: TpkValidationTextareaComponent['hasError'];
        firstError: TpkValidationTextareaComponent['firstError'];
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
      @classless={{@classless}}
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
          errors=this.errors
          hasError=this.hasError
          firstError=this.firstError
        )
      }}
    </TpkTextarea>
  </template>
}
