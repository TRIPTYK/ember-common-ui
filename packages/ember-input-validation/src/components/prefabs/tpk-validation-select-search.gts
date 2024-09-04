import { restartableTask } from 'ember-concurrency';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkSelectSearchComponent from '@triptyk/ember-input/components/tpk-select-search';
import perform from 'ember-concurrency/helpers/perform';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';

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
    onChange: (value: string) => void;
    onSearch: (value: string) => Promise<void>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelectSearchPrefab extends BaseValidationComponent<TpkValidationSelectSearchPrefabSignature> {
  constructor(
    owner: unknown,
    args: TpkValidationSelectSearchPrefabSignature['Args'],
  ) {
    super(owner, args);
  }

  search = restartableTask(async (value: string) => {
    await this.args.onSearch?.(value);
  });

  get isNotIdle() {
    return this.search.isIdle !== true;
  }

  get selected() {
    return this.value as string;
  }

  toString = (v: unknown) => {
    return String(v).toString();
  };

  <template>
    <TpkSelectSearchComponent
      @label={{@label}}
      @options={{@options}}
      @onChange={{@onChange}}
      @selected={{this.selected}}
      @onInput={{perform this.search}}
      anchorScrollUp={{@validationField}}
      @generatedClassPrefix=''
      disabled={{@disabled}}
      class='{{if @disabled "disabled"}} tpk-validation-select-search'
      data-has-error='{{this.hasError}}'
      ...attributes
      as |S|
    >
      <S.Label>
        {{@label}}
        {{#if @mandatory}}
          <span class='mandatory'>
            *
          </span>
        {{/if}}
      </S.Label>

      <div class='tpk-validation-select-search-container'>
        <S.Button />
        <S.Input
          class='tpk-validation-select-search-input'
          placeholder={{@placeholder}}
          type='search'
          @selectedText={{this.selected}}
        />
        {{#if this.isNotIdle}}
          <TpkLoadingSpinner />
        {{/if}}
      </div>
      <TpkValidationErrorsComponent
        @errors={{this.errors}}
        @classless={{@classless}}
      />
      {{#if @options}}
        <S.Options as |Opts|>
          <Opts as |O|>
            {{this.toString O.option}}
          </Opts>
        </S.Options>
      {{/if}}
    </TpkSelectSearchComponent>
  </template>
}

import type { TOC } from '@ember/component/template-only';

export interface TpkLoadingSpinnerComponentSignature {
  Element: HTMLSpanElement;
}

const TpkLoadingSpinner: TOC<TpkLoadingSpinnerComponentSignature> = <template>
  <span class='tpk-validation-select-search-spinner loader'></span>
</template>;
