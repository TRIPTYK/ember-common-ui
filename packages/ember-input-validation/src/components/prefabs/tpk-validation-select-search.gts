import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import type { TpkSelectSignature } from '@triptyk/ember-input/components/tpk-select';

export interface TpkValidationSelectSearchPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkSelectSignature['Args'] & {
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

  @action onChange(value: unknown) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }

  toString = (v: unknown) => {
    return String(v).toString();
  };

  <template>
    <div
      class="{{if @disabled "disabled"}} tpk-validation-select-search"
      data-has-error='{{this.hasError}}'
    >
      <TpkSelectComponent
        @multiple={{@multiple}}
        @classless={{@classless}}
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
        anchorScrollUp={{@validationField}}
        ...attributes
        as |S|
      >
        <S.Option as |O|>
          {{this.toString O.option}}
        </S.Option>
      </TpkSelectComponent>
      <TpkValidationErrorsComponent
        @errors={{this.errors}}
        @classless={{@classless}}
      />
    </div>
  </template>
}
