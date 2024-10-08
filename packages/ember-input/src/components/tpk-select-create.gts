/* eslint-disable no-fallthrough */
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';
import { type Select } from 'ember-power-select/components/power-select';
// @ts-expect-error missing types
import PowerSelectMultipleWithCreate from 'ember-power-select-with-create/components/power-select-multiple-with-create'
// @ts-expect-error missing types
import PowerSelectWithCreate from 'ember-power-select-with-create/components/power-select-with-create'
import TpkSelectNewOption from './tpk-select/option.gts';

export interface TpkSelectSignature {
  Args: {
    multiple?: boolean;
    options: unknown[];
    selected?: unknown;
    label: string;
    renderInPlace?: boolean;
    classless?: boolean;
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
    onCreate: (selection: unknown, select: Select, event?: Event) => void;
    onKeyDown: ((select: Select, e: KeyboardEvent) => boolean | undefined) | undefined
  };
  Blocks: {
    default: [
      {
        Option: WithBoundArgs<
          typeof TpkSelectNewOption,
          | 'option'
        >;
      },
    ];
  };
  Element: HTMLElement;
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
    assert(
      'Please provide an @onCreate function',
      typeof args.onChange === 'function',
    );
  }
  get renderInPlace() {
    return this.args.renderInPlace === false ? false : true;
  }

  <template>
    <div
      class={{unless @classless 'tpk-select'}}
      ...attributes
    >
      {{#if @multiple}}
        <PowerSelectMultipleWithCreate
          @labelText={{@label}}
          @options={{@options}}
          @selected={{@selected}}
          @allowClear={{@allowClear}}
          @onChange={{@onChange}}
          @onCreate={{@onCreate}}
          @labelClass={{unless @classless "tpk-select-label"}}
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
          @dropdownClass={{unless @classless 'tpk-select-dropdown'}}
          @triggerClass={{unless @classless 'tpk-select-trigger'}}
          @initiallyOpened={{@initiallyOpened}}
          @loadingMessage={{@loadingMessage}}
          @noMatchesMessage={{@noMatchesMessage}}
          ...attributes
        as |option|>
          {{yield
            (hash
              Option=(component
                TpkSelectNewOption
                option=option
              )
            )
          }}
        </PowerSelectMultipleWithCreate>
      {{else}}
        <PowerSelectWithCreate
          @labelText={{@label}}
          @options={{@options}}
          @selected={{@selected}}
          @allowClear={{@allowClear}}
          @onChange={{@onChange}}
          @onCreate={{@onCreate}}
          @labelClass={{unless @classless "tpk-select-label"}}
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
          @dropdownClass={{unless @classless 'tpk-select-dropdown'}}
          @triggerClass={{unless @classless 'tpk-select-trigger'}}
          @initiallyOpened={{@initiallyOpened}}
          @loadingMessage={{@loadingMessage}}
          @noMatchesMessage={{@noMatchesMessage}}
          ...attributes
        as |option|>
          {{yield
            (hash
              Option=(component
                TpkSelectNewOption
                option=option
              )
            )
          }}
        </PowerSelectWithCreate>
      {{/if}}
    </div>
  </template>
}
