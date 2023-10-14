import { action } from '@ember/object';
import { type BaseValidationSignature, BaseValidationComponent } from './base';
import TpkSelectLabelComponent from '@triptyk/ember-input/components/tpk-select/label';
import { type ComponentLike } from '@glint/template';
import TpkSelect from '@triptyk/ember-input/components/tpk-select';
import TpkSelectOptionsComponent from '@triptyk/ember-input/components/tpk-select/options';
import TpkSelectButtonComponent from '@triptyk/ember-input/components/tpk-select/button';
import { hash } from '@ember/helper';

export interface TpkValidationSelectComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    defaultText?: string;
    name?: string;
    options: unknown[];
    multiple?: boolean;
    selected?: string;
    classless?: boolean;
    changeEvent?: 'input' | 'change';
    value: string;
    disabled?: boolean;
  };
  Blocks: {
    default: [
      {
        Label: ComponentLike<TpkSelectLabelComponent>;
        Options: ComponentLike<TpkSelectOptionsComponent>;
        Button: ComponentLike<TpkSelectButtonComponent>;
        label?: string;
        selected?: string;
        hasSelection: boolean;
        errors: TpkValidationSelect['errors'];
        hasError: TpkValidationSelect['hasError'];
        firstError: TpkValidationSelect['firstError'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelect extends BaseValidationComponent<TpkValidationSelectComponentSignature> {
  @action onChange(value: unknown) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }

  <template>
    <TpkSelect
      @label={{@label}}
      @options={{@options}}
      @multiple={{@multiple}}
      @selected={{@selected}}
      @onChange={{this.onChange}}
      @classless={{@classless}}
      @defaultText={{@defaultText}}
      ...attributes
      data-has-error='{{this.hasError}}'
      as |I|
    >
      {{yield
        (hash
          Label=I.Label
          Options=I.Options
          Button=I.Button
          selected=@selected
          hasSelection=I.hasSelection
          errors=this.errors
          hasError=this.hasError
          firstError=this.firstError
        )
      }}
    </TpkSelect>
  </template>
}
