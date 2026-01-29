import { action } from '@ember/object';
import {
  BaseValidationComponent,
  type BaseValidationSignature,
} from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { assert } from '@ember/debug';
import TpkSelectComponent, {
  type TpkSelectSignature,
  type SelectType,
} from '@triptyk/ember-input/components/tpk-select';
import type Owner from '@ember/owner';
import type { Merge } from 'type-fest';

type Args = BaseValidationSignature['Args'] &
  // need Merge otherwise onChange stays required
  Merge<
    TpkSelectSignature['Args'],
    {
      onChange?: (value: unknown, select: SelectType, event?: Event) => void;
    }
  >;

export interface TpkValidationSelectPrefabSignature extends BaseValidationSignature {
  Args: Omit<
    Args,
    | 'searchField'
    | 'searchPlaceholder'
    | 'searchMessage'
    | 'noMatchesMessage'
    | 'search'
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelectPrefabComponent extends BaseValidationComponent<TpkValidationSelectPrefabSignature> {
  constructor(owner: Owner, args: TpkValidationSelectPrefabSignature['Args']) {
    super(owner, args);
    assert(
      'If you want use search, please use TpkValidationSelectSearchPrefab',
      typeof args.searchEnabled === 'undefined',
    );
  }

  @action
  onChange(selection: unknown, select: SelectType, event?: Event) {
    if (this.args.onChange) {
      return this.args.onChange(selection, select, event);
    }
    return this.args.changeset.set(this.args.validationField, selection);
  }

  get label() {
    return this.mandatory ? `${this.args.label} *` : this.args.label;
  }

  toString = (v: unknown) => {
    assert(
      'TpkValidationSelectPrefab toString: object has no custom toString method, returning [object Object]',
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      !(v && typeof v === 'object' && v.toString() === '[object Object]'),
    );
    return String(v).toString();
  };

  <template>
    <div
      class='{{if @disabled "disabled"}} tpk-select-container'
      {{! @glint-expect-error }}
      anchorScrollUp={{@validationField}}
      data-has-error='{{this.hasError}}'
      data-test-tpk-prefab-select-container={{@validationField}}
      ...attributes
    >
      <TpkSelectComponent
        @label={{@label}}
        @multiple={{@multiple}}
        @disabled={{@disabled}}
        @placeholder={{@placeholder}}
        @initiallyOpened={{@initiallyOpened}}
        @allowClear={{@allowClear}}
        @options={{@options}}
        @onChange={{this.onChange}}
        @selected={{this.value}}
        @labelComponent={{@labelComponent}}
        @labelClass='tpk-label'
        @selectedItemComponent={{@selectedItemComponent}}
        @placeholderComponent={{@placeholderComponent}}
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
