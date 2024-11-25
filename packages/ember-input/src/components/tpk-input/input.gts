import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import didUpdate from '@ember/render-modifiers/modifiers/did-update';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import type { FactoryArg, InputMask } from 'imask';
import IMask from 'imask';

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

  @action onChange(e: Event): void {
    e.preventDefault();
    let value = this.inputValue(e.target as HTMLInputElement);
    if (this.mask) {
      value = this.args.unmaskValue ? this.mask.typedValue : this.mask.value;
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

  <template>
    <input
      class='tpk-input-input'
      id={{@guid}}
      min={{@min}}
      step={{@step}}
      max={{@max}}
      type={{@type}}
      value={{@value}}
      disabled={{@disabled}}
      placeholder={{@placeholder}}
      {{didInsert this.setMask}}
      {{didUpdate this.setMask @mask}}
      {{on @changeEvent this.onChange}}
      ...attributes
      data-test-tpk-input-input
    />
  </template>
}
