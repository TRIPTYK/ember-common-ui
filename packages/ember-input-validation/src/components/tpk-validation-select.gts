import { action } from '@ember/object';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from './base.ts';
import type { TpkSelectSignature } from '@triptyk/ember-input/components/tpk-select';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import { hash } from '@ember/helper';
import type { WithBoundArgs } from '@glint/template';
import type TpkSelectResetButtonComponent from '@triptyk/ember-input/components/tpk-select/reset-button';

export interface TpkValidationSelectComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    name?: string;
    options: unknown[];
    classless?: boolean;
    changeEvent?: 'input' | 'change';
    disabled?: boolean;
    multiple?: boolean;
    selected?: unknown | unknown[];
  };
  Blocks: {
    default: [
      {
        Label: TpkSelectSignature['Blocks']['default'][0]['Label'];
        Options: TpkSelectSignature['Blocks']['default'][0]['Options'];
        Button: TpkSelectSignature['Blocks']['default'][0]['Button'];
        ResetButton: WithBoundArgs<typeof TpkSelectResetButtonComponent, 'onReset'>;
        label?: string;
        selected?: unknown | unknown[];
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
    <TpkSelectComponent
      @label={{@label}}
      @options={{@options}}
      @multiple={{@multiple}}
      @selected={{@selected}}
      @onChange={{this.onChange}}
      @classless={{@classless}}
      ...attributes
      data-has-error='{{this.hasError}}'
      as |I|
    >
      {{yield
        (hash
          Label=I.Label
          Options=I.Options
          ResetButton=I.ResetButton
          Button=I.Button
          selected=@selected
          hasSelection=I.hasSelection
          errors=this.errors
          hasError=this.hasError
          firstError=this.firstError
        )
      }}
    </TpkSelectComponent>
  </template>
}
