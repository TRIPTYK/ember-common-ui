import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { assert } from '@ember/debug';
import { type Select } from 'ember-power-select/components/power-select';
import { action } from '@ember/object';
import type { TpkSelectSignature } from '@triptyk/ember-input/components/tpk-select';

export interface TpkValidationSelectSearchPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkSelectSignature['Args'] & {
    onChange?: (value: unknown, select: Select, event?: Event) => void;
    onSearch: (term: string) => unknown[];
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelectSearchPrefabComponent extends BaseValidationComponent<TpkValidationSelectSearchPrefabSignature> {
  constructor(
    owner: unknown,
    args: TpkValidationSelectSearchPrefabSignature['Args'],
  ) {
    super(owner, args);
    assert(
      'Please provide an @onSearch function',
      typeof args.onSearch === 'function',
    );
  }

  get label() {
    return this.mandatory ? `${this.args.label} *` : this.args.label;
  }

  @action onChange(selection: unknown, select: Select, event?: Event) {
    if (this.args.onChange) {
      return this.args.onChange(selection, select, event);
    }
    return this.args.changeset.set(this.args.validationField, selection);
  }

  toString = (v: unknown) => {
    return String(v).toString();
  };

  <template>
    <div
      class="{{if @disabled "disabled"}} tpk-validation-select-search tpk-select"
      data-has-error='{{this.hasError}}'
      anchorScrollUp={{@validationField}}
      ...attributes
    >
      <TpkSelectComponent
        @multiple={{@multiple}}
        @placeholder={{@placeholder}}
        @initiallyOpened={{@initiallyOpened}}
        @allowClear={{@allowClear}}
        @labelComponent={{@labelComponent}}
        @selectedItemComponent={{@selectedItemComponent}}
        @placeholderComponent={{@placeholderComponent}}
        @label={{this.label}}
        @options={{@options}}
        @onChange={{this.onChange}}
        @selected={{this.value}}
        @search={{@onSearch}}
        @searchEnabled={{true}}
        @searchPlaceholder={{@searchPlaceholder}}
        @searchMessage={{@searchMessage}}
        @loadingMessage={{@loadingMessage}}
        @noMatchesMessage={{@noMatchesMessage}}
        @disabled={{@disabled}}
        as |S|
      >
        <S.Option as |O|>
          {{this.toString O.option}}
        </S.Option>
      </TpkSelectComponent>
      <TpkValidationErrorsComponent
        @errors={{this.errors}}

      />
    </div>
  </template>
}
