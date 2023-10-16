import { action } from '@ember/object';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from './base.ts';
import { assert } from '@ember/debug';
import type { ComponentLike } from '@glint/template';
import TpkCheckbox from '@triptyk/ember-input/components/tpk-checkbox';
import TpkCheckboxInputComponent from '@triptyk/ember-input/components/tpk-checkbox/input';
import TpkCheckboxLabelComponent from '@triptyk/ember-input/components/tpk-checkbox/label';
import { hash } from '@ember/helper';

export interface TpkValidationCheckboxComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    classless?: boolean;
    changeEvent?: 'input' | 'change';
    disabled?: boolean;
  };
  Blocks: {
    default: [
      {
        Input: ComponentLike<typeof TpkCheckboxInputComponent>;
        Label: ComponentLike<typeof TpkCheckboxLabelComponent>;
        errors: TpkValidationCheckboxComponent['errors'];
        hasError: TpkValidationCheckboxComponent['hasError'];
        firstError: TpkValidationCheckboxComponent['firstError'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationCheckboxComponent extends BaseValidationComponent<TpkValidationCheckboxComponentSignature> {
  @action
  onChange(checked: boolean) {
    if (this.args.onChange) {
      return this.args.onChange(checked);
    }
    return this.args.changeset.set(this.args.validationField, checked);
  }

  get value() {
    assert(
      'value must be a boolean or null or undefined',
      typeof super.value === 'boolean' ||
        super.value === null ||
        super.value === undefined,
    );
    return super.value ?? false;
  }

  <template>
    <TpkCheckbox
      @checked={{this.value}}
      @label={{@label}}
      @classless={{@classless}}
      @changeEvent={{@changeEvent}}
      @disabled={{@disabled}}
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
    </TpkCheckbox>
  </template>
}
