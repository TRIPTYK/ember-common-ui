import { action } from '@ember/object';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from './base.ts';
import type { TpkSelectSignature } from '@triptyk/ember-input/components/tpk-select';
import TpkSelectComponent, { type Select } from '@triptyk/ember-input/components/tpk-select';
import { hash } from '@ember/helper';

export interface TpkValidationSelectComponentSignature {
  Args: BaseValidationSignature['Args'] & TpkSelectSignature['Args'] & {
    onChange?: (value: unknown, select: Select, event?: Event) => void;
  };
  Blocks: {
    default: [
      {
        Option: TpkSelectSignature['Blocks']['default'][0]['Option'];
        errors: TpkValidationSelect['errors'];
        hasError: TpkValidationSelect['hasError'];
        firstError: TpkValidationSelect['firstError'];
        mandatory: TpkValidationSelect['mandatory'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelect extends BaseValidationComponent<TpkValidationSelectComponentSignature> {
  @action onChange(selection: unknown, select: Select, event?: Event) {
    if (this.args.onChange) {
      return this.args.onChange(selection, select, event);
    }
    return this.args.changeset.set(this.args.validationField, selection);
  }

  get label() {
    return this.mandatory ? `${this.args.label} *` : this.args.label;
  }

  <template>
    <div
      class="{{if @disabled "disabled"}} tpk-validation-select"
      data-has-error='{{this.hasError}}'
      anchorScrollUp={{@validationField}}
      ...attributes
    >
      <TpkSelectComponent
        @multiple={{@multiple}}
        @onChange={{this.onChange}}
        @label={{this.label}}
        @options={{@options}}
        @placeholder={{@placeholder}}
        @selected={{this.value}}
        @allowClear={{@allowClear}}

        @renderInPlace={{@renderInPlace}}
        @labelComponent={{@labelComponent}}
        @selectedItemComponent={{@selectedItemComponent}}
        @placeholderComponent={{@placeholderComponent}}
        @searchEnabled={{@searchEnabled}}
        @searchField={{@searchField}}
        @searchPlaceholder={{@searchPlaceholder}}
        @searchMessage={{@searchMessage}}
        @search={{@search}}
        @onKeyDown={{@onKeyDown}}
        @disabled={{@disabled}}
        @initiallyOpened={{@initiallyOpened}}
        @loadingMessage={{@loadingMessage}}
        @noMatchesMessage={{@noMatchesMessage}}
        as |I|
      >
        {{yield
          (hash
            Option=I.Option
            errors=this.errors
            hasError=this.hasError
            firstError=this.firstError
            mandatory=this.mandatory
          )
        }}
      </TpkSelectComponent>
    </div>
  </template>
}
