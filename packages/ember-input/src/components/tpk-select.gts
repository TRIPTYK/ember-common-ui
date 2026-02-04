import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';
import type {
  PowerSelectSelectedItemSignature,
  Select,
} from 'ember-power-select/types';
import PowerSelect from 'ember-power-select/components/power-select';
import TpkSelectOption from './tpk-select/option.gts';
import type Owner from '@ember/owner';
import type { PowerSelectLabelSignature } from 'ember-power-select/components/power-select/label';
import type { PowerSelectPlaceholderSignature } from 'ember-power-select/components/power-select/placeholder';

export type SelectType = Select;

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
    labelComponent?: ComponentLike<PowerSelectLabelSignature>;
    selectedItemComponent?: ComponentLike<PowerSelectSelectedItemSignature>;
    placeholderComponent?: ComponentLike<PowerSelectPlaceholderSignature>;
    searchEnabled?: boolean;
    searchField?: string;
    searchPlaceholder?: string;
    searchMessage?: string;
    noMatchesMessage?: string;
    search?: (
      term: string,
      select: SelectType,
    ) => readonly unknown[] | Promise<readonly unknown[]>;
    onChange: (selection: unknown, select: SelectType, event?: Event) => void;
    onKeyDown?:
      | ((select: SelectType, e: KeyboardEvent) => boolean | undefined)
      | undefined;
  };
  Blocks: {
    default: [
      {
        Option: WithBoundArgs<typeof TpkSelectOption, 'option'>;
      },
    ];
  };
}

export default class TpkSelectComponent extends Component<TpkSelectSignature> {
  constructor(owner: Owner, args: TpkSelectSignature['Args']) {
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

  get multiple() {
    return this.args.multiple === true ? undefined : false;
  }
  <template>
    <PowerSelect
      @labelText={{@label}}
      @options={{@options}}
      @selected={{@selected}}
      @placeholder={{@placeholder}}
      @allowClear={{@allowClear}}
      @onChange={{@onChange}}
      @labelClass={{@labelClass}}
      @multiple={{this.multiple}}
      @renderInPlace={{this.renderInPlace}}
      {{! @glint-ignore }}
      @labelComponent={{@labelComponent}}
      {{! @glint-ignore }}
      @selectedItemComponent={{@selectedItemComponent}}
      {{! @glint-ignore }}
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
      as |option|
    >
      {{yield (hash Option=(component TpkSelectOption option=option))}}
    </PowerSelect>
  </template>
}
