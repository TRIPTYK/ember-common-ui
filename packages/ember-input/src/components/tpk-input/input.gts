import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import type { FactoryArg, InputMask } from 'imask';
import IMask from 'imask';
import type Owner from '@ember/owner';
import { modifier, type FunctionBasedModifier } from 'ember-modifier';
import type { EmptyObject } from 'type-fest';

export interface TpkInputInputComponentSignature {
  Args: {
    guid: string;
    type?: string;
    placeholder?: string;
    mask?: unknown;
    maskOptions?: Record<string, unknown>;
    unmaskValue?: boolean;
    disabled?: boolean;
    min?: number;
    step?: number;
    max?: number;
    value?: string | number | boolean | null | undefined;
    changeEvent: 'input' | 'change';
    onChange?: (value: string | number | Date | null, e: Event) => unknown;
  };
  Element: HTMLInputElement;
  Blocks: {
    default: unknown[];
  };
}

export default class TpkInputInputComponent extends Component<TpkInputInputComponentSignature> {
  @tracked mask?: InputMask<FactoryArg>;

  public constructor(
    owner: Owner,
    args: TpkInputInputComponentSignature['Args'],
  ) {
    super(owner, args);
  }

  get value() {
    if (this.mask) {
      return this.mask.displayValue;
    }
    return this.args.value;
  }

  @action onChange(e: Event): void {
    e.preventDefault();
    let value = this.inputValue(e.target as HTMLInputElement);
    if (this.mask) {
      value = this.args.unmaskValue
        ? (this.mask.typedValue as string | number | Date | null)
        : this.mask.value;
    }
    this.args.onChange?.(value, e);
  }

  private inputValue(input: HTMLInputElement) {
    if (this.args.type === 'number') {
      return input.valueAsNumber;
    }

    if (this.args.type === 'date') {
      return input.valueAsDate;
    }

    return input.value;
  }

  @action
  setMask(element: HTMLInputElement) {
    if (!this.args.mask) return;

    this.mask = IMask(element, {
      mask: this.args.mask,
      ...this.args.maskOptions,
    } as Record<string, unknown>);
  }

  setupMask: FunctionBasedModifier<{
    Args: {
      Positional: unknown[];
      Named: EmptyObject;
    };
    Element: HTMLElement;
  }> = modifier((element: HTMLElement) => {
    this.setMask(element as HTMLInputElement);
  });

  <template>
    <input
      id={{@guid}}
      min={{@min}}
      step={{@step}}
      max={{@max}}
      type={{@type}}
      value={{this.value}}
      disabled={{@disabled}}
      placeholder={{@placeholder}}
      {{this.setupMask @mask}}
      {{on @changeEvent this.onChange}}
      ...attributes
      data-test-tpk-input-input
    />
  </template>
}
