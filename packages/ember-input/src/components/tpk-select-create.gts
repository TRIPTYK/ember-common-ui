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
import TpkSelectOption from './tpk-select/option.gts';
import type { TpkSelectSignature } from './tpk-select';
import { guidFor } from '@ember/object/internals';

export interface TpkSelectCreateSignature {
  Args: TpkSelectSignature['Args'] & {
    multiple?: boolean;
    options: unknown[];
    selected?: unknown;
    label: string;
    placeholder?: string;
    renderInPlace?: boolean;

    allowClear?: boolean;
    disabled?: boolean;
    initiallyOpened?: boolean;
    loadingMessage?: string;
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
    buildSuggestion?: (term: string) => string;
    showCreateWhen?: (term: string) => boolean;
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
  Element: HTMLDivElement;
}

export default class TpkSelectCreateComponent extends Component<TpkSelectCreateSignature> {
  guid = guidFor(this);

  constructor(owner: unknown, args: TpkSelectCreateSignature['Args']) {
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
      typeof args.onCreate === 'function',
    );
  }
  get renderInPlace() {
    return this.args.renderInPlace === false ? false : true;
  }

  <template>
    <div
      class='tpk-select-create'
      ...attributes
    >
      <label class="tpk-select-create-label" for={{this.guid}}>
        {{@label}}
      </label>
      {{#if @multiple}}
        <PowerSelectMultipleWithCreate
          @placeholder={{@placeholder}}
          @options={{@options}}
          @selected={{@selected}}
          @allowClear={{@allowClear}}
          @onChange={{@onChange}}
          @onCreate={{@onCreate}}
          @renderInPlace={{this.renderInPlace}}
          @selectedItemComponent={{@selectedItemComponent}}
          @placeholderComponent={{@placeholderComponent}}
          @searchEnabled={{@searchEnabled}}
          @searchField={{@searchField}}
          @searchPlaceholder={{@searchPlaceholder}}
          @searchMessage={{@searchMessage}}
          @search={{@search}}
          @onKeydown={{@onKeyDown}}
          @disabled={{@disabled}}
          @dropdownClass='tpk-select-create-dropdown'
          @triggerClass='tpk-select-create-trigger'
          @buildSuggestion={{@buildSuggestion}}
          @showCreateWhen={{@showCreateWhen}}
          @initiallyOpened={{@initiallyOpened}}
          @loadingMessage={{@loadingMessage}}
          @noMatchesMessage={{@noMatchesMessage}}
          @triggerId={{this.guid}}
        as |option|>
          {{yield
            (hash
              Option=(component
                TpkSelectOption
                option=option
              )
            )
          }}
        </PowerSelectMultipleWithCreate>
      {{else}}
        <PowerSelectWithCreate
          @placeholder={{@placeholder}}
          @options={{@options}}
          @selected={{@selected}}
          @allowClear={{@allowClear}}
          @onChange={{@onChange}}
          @onCreate={{@onCreate}}
          @renderInPlace={{this.renderInPlace}}
          @selectedItemComponent={{@selectedItemComponent}}
          @placeholderComponent={{@placeholderComponent}}
          @searchEnabled={{@searchEnabled}}
          @searchField={{@searchField}}
          @searchPlaceholder={{@searchPlaceholder}}
          @searchMessage={{@searchMessage}}
          @search={{@search}}
          @onKeydown={{@onKeyDown}}
          @disabled={{@disabled}}
          @dropdownClass='tpk-select-create-dropdown'
          @triggerClass='tpk-select-create-trigger'
          @buildSuggestion={{@buildSuggestion}}
          @showCreateWhen={{@showCreateWhen}}
          @initiallyOpened={{@initiallyOpened}}
          @loadingMessage={{@loadingMessage}}
          @noMatchesMessage={{@noMatchesMessage}}
          @triggerId={{this.guid}}
        as |option|>
          {{yield
            (hash
              Option=(component
                TpkSelectOption
                option=option
              )
            )
          }}
        </PowerSelectWithCreate>
      {{/if}}
    </div>
  </template>
}
