import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import type { TpkValidationInputComponentSignature } from '../tpk-validation-input.gts';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkInputComponent from '@triptyk/ember-input/components/tpk-input';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from './mandatory-label.gts';

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
  Element: HTMLElement;
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

export default class TpkValidationMobilePrefabComponent extends BaseValidationComponent<TpkValidationMobilePrefabSignature> {
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
      @disabled={{@disabled}}
      @mask={{this.mask}}
      @unmaskValue={{true}}
      as |I|
    >
      <div
        class='tpk-mobile-container'
        data-has-error='{{this.hasError}}'
        data-test-tpk-prefab-mobile-container
      >
        <I.Label
          anchorScrollUp={{@validationField}}
          data-test-tpk-input
          data-has-error='{{this.hasError}}'
          class='tpk-mobile-label-container'
          ...attributes
        >
          <MandatoryLabelComponent @label={{@label}} @mandatory={{this.mandatory}} class="tpk-label"  />
        </I.Label>
        <div class="tpk-mobile-content">
          <TpkSelectComponent
            @label=''
            @options={{this.prefixes}}
            @selected={{this.selectedPrefix}}
            @disabled={{@disabled}}
            @onChange={{this.onChangeValuePrefix}}
            as |T|
          >
            <T.Option as |O|>
              <div class='flag'>
                <img
                  alt={{this.getValueFromOption O.option 'code'}}
                  src={{this.getValueFromOption O.option 'flag'}}
                  width='20'
                />
                <div>
                  {{this.getValueFromOption O.option 'code'}}
                </div>
              </div>
            </T.Option>
          </TpkSelectComponent>
          <I.Input inputmode='tel' class="tpk-mobile-input" />
        </div>
        <TpkValidationErrorsComponent
          class="tpk-validation-errors"
          @errors={{this.errors}}
        />
      </div>
    </TpkInputComponent>
  </template>
}
