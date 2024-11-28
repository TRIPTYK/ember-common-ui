/* eslint-disable no-fallthrough */
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';
import PowerSelect, { type Select } from 'ember-power-select/components/power-select';
import PowerSelectMultiple from 'ember-power-select/components/power-select-multiple';
import TpkSelectOption from './tpk-select/option.gts';

export { type Select } from 'ember-power-select/components/power-select';

export interface TpkSelectSignature {
  Args: {
    multiple?: boolean;
    options: unknown[];
    selected?: unknown;
    label: string;
    placeholder?: string;
    renderInPlace?: boolean;
    labelClass?: string;
    allowClear?: boolean;
    disabled?: boolean;
    initiallyOpened?: boolean;
    loadingMessage?: string;
    labelComponent?: string | ComponentLike<unknown>;
    selectedItemComponent?: string | ComponentLike<unknown>;
    placeholderComponent?: string | ComponentLike<unknown>;
    searchEnabled?: boolean;
    searchField?: string;
    searchPlaceholder?: string;
    searchMessage?: string;
    noMatchesMessage?: string;
    search?: ((term: string, select: Select) => readonly unknown[] | Promise<readonly unknown[]>) | undefined
    onChange: (selection: unknown, select: Select, event?: Event) => void;
    onKeyDown?: ((select: Select, e: KeyboardEvent) => boolean | undefined) | undefined
  };
  Blocks: {
    default: [
      {
        Option: WithBoundArgs<
          typeof TpkSelectOption,
          | 'option'
        >;
      },
    ];
  };
}

export default class TpkSelectComponent extends Component<TpkSelectSignature> {
  constructor(owner: unknown, args: TpkSelectSignature['Args']) {
    super(owner, args);

    assert(
      'Please provide an @options array to component',
      args.options !== undefined,
    );
    assert(
      'Please provide an @onChange function',
      typeof args.onChange === 'function',
    );
  }
  get renderInPlace() {
    return this.args.renderInPlace === false ? false : true;
  }

  <template>
    {{#if @multiple}}
      <PowerSelectMultiple
        @labelText={{@label}}
        @options={{@options}}
        @selected={{@selected}}
        @allowClear={{@allowClear}}
        @onChange={{@onChange}}
        @placeholder={{@placeholder}}
        @labelClass={{@labelClass}}
        @renderInPlace={{this.renderInPlace}}
        @labelComponent={{@labelComponent}}
        @selectedItemComponent={{@selectedItemComponent}}
        @placeholderComponent={{@placeholderComponent}}
        @searchEnabled={{@searchEnabled}}
        @searchField={{@searchField}}
        @searchPlaceholder={{@searchPlaceholder}}
        @searchMessage={{@searchMessage}}
        @search={{@search}}
        @onKeydown={{@onKeyDown}}
        @disabled={{@disabled}}
        @dropdownClass='tpk-select-dropdown'
        @triggerClass='tpk-select-trigger'
        @initiallyOpened={{@initiallyOpened}}
        @loadingMessage={{@loadingMessage}}
        @noMatchesMessage={{@noMatchesMessage}}
      as |option|>
        {{yield
          (hash
            Option=(component
              TpkSelectOption
              option=option
            )
          )
        }}
      </PowerSelectMultiple>
    {{else}}
      <PowerSelect
        @labelText={{@label}}
        @options={{@options}}
        @selected={{@selected}}
        @placeholder={{@placeholder}}
        @allowClear={{@allowClear}}
        @onChange={{@onChange}}
        @labelClass={{@labelClass}}
        @renderInPlace={{this.renderInPlace}}
        @labelComponent={{@labelComponent}}
        @selectedItemComponent={{@selectedItemComponent}}
        @placeholderComponent={{@placeholderComponent}}
        @searchEnabled={{@searchEnabled}}
        @searchField={{@searchField}}
        @searchPlaceholder={{@searchPlaceholder}}
        @searchMessage={{@searchMessage}}
        @search={{@search}}
        @onKeydown={{@onKeyDown}}
        @disabled={{@disabled}}
        @dropdownClass='tpk-select-dropdown'
        @triggerClass='tpk-select-trigger'
        @initiallyOpened={{@initiallyOpened}}
        @loadingMessage={{@loadingMessage}}
        @noMatchesMessage={{@noMatchesMessage}}
      as |option|>
        {{yield
          (hash
            Option=(component
              TpkSelectOption
              option=option
            )
          )
        }}
      </PowerSelect>
    {{/if}}
  </template>
}
