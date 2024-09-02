import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import type { TpkValidationInputComponentSignature } from '../tpk-validation-input.gts';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkInputComponent from '@triptyk/ember-input/components/tpk-input';

export interface TpkValidationMobilePrefabSignature
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
    | 'changeEvent'
    | 'onChange'
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

interface Prefix {
  flag: string;
  code: string;
}

const masks = {
  '+31': '00 0000 0000', // Netherlands
  '+32': '000 00 00 00', // Belgium
  '+33': '0 00 00 00 00', // France
  '+49': '0000 0000000', // Germany
  '+352': '000 000 000', // Luxembourg
};

export default class TpkValidationMobilePrefab extends BaseValidationComponent<TpkValidationMobilePrefabSignature> {
  defaultPrefix = { flag: '/BE.svg', code: '+32' };
  @tracked selectedPrefix = this.defaultPrefix;
  @tracked prefixes: Prefix[] = [
    { flag: '/NL.svg', code: '+31' },
    { flag: '/BE.svg', code: '+32' },
    { flag: '/FR.svg', code: '+33' },
    { flag: '/DE.svg', code: '+49' },
    { flag: '/LU.svg', code: '+352' },
  ];

  constructor(
    owner: unknown,
    args: TpkValidationMobilePrefabSignature['Args'],
  ) {
    super(owner, args);
    this.selectedPrefix = this.getPrefix();
  }

  get valueForMobileNumber() {
    return this.getValue();
  }

  get mask() {
    return (
      masks[this.selectedPrefix.code as keyof typeof masks] || '000 00 00 00'
    );
  }

  getPrefix(): Prefix {
    const value = this.value;
    if (typeof value === 'string') {
      const matchedPrefix =
        this.prefixes.find((prefix) => value.startsWith(prefix.code)) ||
        this.defaultPrefix;
      return matchedPrefix;
    }
    return this.defaultPrefix;
  }

  getValue(): string {
    const fullValue = this.value as string;
    if (typeof fullValue === 'string') {
      const matchedPrefix = this.prefixes.find((prefix) =>
        fullValue.startsWith(prefix.code),
      );
      if (matchedPrefix) {
        return fullValue.slice(matchedPrefix.code.length).trim();
      }
    }
    return fullValue || '';
  }

  @action
  onChangeValueMobile(value: unknown) {
    if (!value) return;
    this.args.changeset.set(
      this.args.validationField,
      `${this.selectedPrefix.code}${value}`,
    );
  }

  @action
  onChangeValuePrefix(value: unknown) {
    if (!value) return;
    const code = (value as Prefix).code;
    this.selectedPrefix =
      this.prefixes.find((prefix) => prefix.code === code) ||
      this.defaultPrefix;
  }

  getValueFromOption = (option: unknown, key: keyof Prefix) =>
    (option as Prefix)[key] as string;

  <template>
    <TpkInputComponent
      @value={{this.valueForMobileNumber}}
      @label={{@label}}
      @onChange={{this.onChangeValueMobile}}
      @classless={{@classless}}
      @disabled={{@disabled}}
      @mask={{this.mask}}
      @unmaskValue={{true}}
      ...attributes
      data-has-error='{{this.hasError}}'
      as |I|
    >
      <I.Label
        class={{unless @classless 'tpk-input-validation-label'}}
        data-test-label-not-yielded
      >
        {{@label}}
        {{#if @mandatory}}
          <span>
            *
          </span>
        {{/if}}
      </I.Label>
      <div
        class={{unless @classless 'tpk-input-validation-mobile'}}
        data-test-mobile-validation
      >
        <TpkSelectComponent
          @label=''
          @options={{this.prefixes}}
          @selected={{this.selectedPrefix}}
          @onChange={{this.onChangeValuePrefix}}
          @classless={{@classless}}
          ...attributes
          as |T|
        >
          <T.Options as |Opts|>
            <Opts as |O|>
              <div class='flag'>
                <img
                  src={{this.getValueFromOption O.option 'flag'}}
                  width='20'
                />
                <div>
                  {{this.getValueFromOption O.option 'code'}}
                </div>
              </div>
            </Opts>
          </T.Options>
          <T.Button>
            <div class='flag'>
              <img
                src={{this.getValueFromOption T.selected 'flag'}}
                width='20'
              />
              <div>
                {{this.getValueFromOption T.selected 'code'}}
              </div>
            </div>
          </T.Button>
        </TpkSelectComponent>
        <I.Input inputmode='tel' />
      </div>
    </TpkInputComponent>
  </template>
}
