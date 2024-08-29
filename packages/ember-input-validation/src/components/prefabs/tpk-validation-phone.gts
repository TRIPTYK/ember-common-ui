import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import type { TpkValidationInputComponentSignature } from '../tpk-validation-input.gts';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkValidationInputComponent from '../tpk-validation-input.gts';
import TpkInputComponent from '@triptyk/ember-input/components/tpk-input';

export interface TpkValidationPhonePrefabSignature
  extends BaseValidationSignature {
  Args: Omit<
    TpkValidationInputComponentSignature['Args'],
    | 'type'
    | 'min'
    | 'max'
    | 'step'
    | 'mask'
    | 'unmaskValue'
    | 'maskOptions'
    | 'mask'
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationPhonePrefab extends BaseValidationComponent<TpkValidationPhonePrefabSignature> {
  @tracked selectedPrefixe = '+32';
  @tracked prefixes: string[] = ['+31', '+32', '+33', '+49', '+352'];

  constructor(owner: unknown, args: TpkValidationPhonePrefabSignature['Args']) {
    super(owner, args);
    this.selectedPrefixe = this.getPrefix();
  }

  get value() {
    return this.getValue();
  }

  get mask() {
    const masks = {
      '+31': '00 000 00 00', // Netherlands
      '+32': '000 00 00 00', // Belgium
      '+33': '0 00 00 00 00', // France
      '+49': '000 000 00000', // Germany
      '+352': '000 000 000', // Luxembourg
    };
    return masks[this.selectedPrefixe as keyof typeof masks] || '000 000 0000';
  }

  getPrefix(): string {
    const value = this.args.changeset.get(this.args.validationField);
    if (typeof value === 'string') {
      const matchedPrefix =
        this.prefixes.find((prefix) => value.startsWith(prefix)) || '+32';
      return matchedPrefix;
    }
    return '+32';
  }

  getValue(): string {
    const fullValue = this.args.changeset.get(
      this.args.validationField,
    ) as string;
    if (typeof fullValue === 'string') {
      const matchedPrefix = this.prefixes.find((prefix) =>
        fullValue.startsWith(prefix),
      );
      if (matchedPrefix) {
        return fullValue.slice(matchedPrefix.length).trim();
      }
    }
    return fullValue || '';
  }

  @action
  onChangeValuePhone(value: unknown) {
    if (!value) return;
    this.args.changeset.set(
      this.args.validationField,
      `${this.selectedPrefixe}${value}`,
    );
  }

  @action
  onChangeValuePrefix(value: unknown) {
    if (!value) return;
    this.selectedPrefixe = value as string;
  }

  toString = (option: unknown) => option as string;

  <template>
    <TpkInputComponent
      @value={{this.value}}
      @label={{@label}}
      @onChange={{this.onChangeValuePhone}}
      @classless={{@classless}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @mask={{this.mask}}
      @unmaskValue={{true}}
      ...attributes
      data-has-error='{{this.hasError}}'
      as |I|
    >
      <I.Label />
      <div
        class={{unless @classless 'tpk-input-phone'}}
        data-test-phone-validation
      >
        <TpkSelectComponent
          @label=''
          @options={{this.prefixes}}
          @selected={{this.selectedPrefixe}}
          @onChange={{this.onChangeValuePrefix}}
          @classless={{@classless}}
          data-has-error='{{this.hasError}}'
          ...attributes
          as |T|
        >
          <T.Options as |Opts|>
            <Opts as |O|>
              {{this.toString O.option}}
            </Opts>
          </T.Options>
          <T.Button>
            {{this.toString T.selected}}
          </T.Button>
        </TpkSelectComponent>
        <I.Input />
      </div>
    </TpkInputComponent>
  </template>
}
