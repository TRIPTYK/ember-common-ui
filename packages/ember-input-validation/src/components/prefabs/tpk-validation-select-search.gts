import { restartableTask } from 'ember-concurrency';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import perform from 'ember-concurrency/helpers/perform';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

export interface TpkValidationSelectSearchPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    mandatory?: boolean;
    name?: string;
    placeholder?: string;
    options: unknown[];
    classless?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    searchPlaceholder?: string;
    searchMessage?: string;
    noMatchesMessage?: string;
    loadingMessage?: string;
    onChange: (value: string) => void;
    onSearch: (value: string) => Promise<void>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class TpkValidationSelectSearchPrefab extends BaseValidationComponent<TpkValidationSelectSearchPrefabSignature> {
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

  @action onChange(value: unknown) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }

  search = restartableTask(async (value: string) => {
    await this.args.onSearch?.(value);
  });

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
        @label={{@label}}
        @options={{@options}}
        @onChange={{this.onChange}}
        @selected={{this.value}}
        @search={{perform this.search}}
        @searchEnabled={{true}}
        @searchPlaceholder={{@searchPlaceholder}}
        @searchMessage={{@searchMessage}}
        @loadingMessage={{@loadingMessage}}
        @noMatchesMessage={{@noMatchesMessage}}
        anchorScrollUp={{@validationField}}
        disabled={{@disabled}}
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
