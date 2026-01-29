import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import type {
  TpkSelectSignature,
  SelectType,
} from '@triptyk/ember-input/components/tpk-select';
import type Owner from '@ember/owner';
import type { Merge } from 'type-fest';

type Args = BaseValidationSignature['Args'] &
  // need Merge otherwise onChange stays required
  Merge<
    TpkSelectSignature['Args'],
    {
      onChange?: (value: unknown, select: SelectType, event?: Event) => void;
      onSearch: TpkSelectSignature['Args']['search'];
    }
  >;

export interface TpkValidationSelectSearchPrefabSignature extends BaseValidationSignature {
  Args: Args;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelectSearchPrefabComponent extends BaseValidationComponent<TpkValidationSelectSearchPrefabSignature> {
  constructor(
    owner: Owner,
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

  @action onChange(selection: unknown, select: SelectType, event?: Event) {
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
      class='{{if @disabled "disabled"}} tpk-select-search-container'
      data-has-error='{{this.hasError}}'
      {{! @glint-expect-error }}
      anchorScrollUp={{@validationField}}
      data-test-tpk-prefab-select-search-container={{@validationField}}
      ...attributes
    >
      <TpkSelectComponent
        @multiple={{@multiple}}
        @placeholder={{@placeholder}}
        @initiallyOpened={{@initiallyOpened}}
        @allowClear={{@allowClear}}
        @labelComponent={{@labelComponent}}
        @labelClass='tpk-label'
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
        class='tpk-validation-errors'
        @errors={{this.errors}}
      />
    </div>
  </template>
}
