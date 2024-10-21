import TpkValidationInputComponent, {
  type TpkValidationInputComponentSignature,
} from '../tpk-validation-input.gts';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from './mandatory-label.gts';
import Component from '@glimmer/component';

export interface TpkValidationNumberComponentSignature
  extends BaseValidationSignature {
  Args: Omit<
    TpkValidationInputComponentSignature['Args'],
    | 'unmaskValue'
    | 'maskOptions'
  > & {
    unsigned?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationNumberPrefabComponent extends Component<TpkValidationNumberComponentSignature> {

get min() {
  return this.args.unsigned ? 0 : this.args.min;
}

  <template>
    <TpkValidationInputComponent
      @type='number'
      @label={{@label}}
      @min={{this.min}}
      @step={{@step}}
      @classless={{@classless}}
      @disabled={{@disabled}}
      @mandatory={{@mandatory}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @requiredFields={{@requiredFields}}
      data-test-input='number'
      anchorScrollUp={{@validationField}}
      ...attributes
      as |I|
    >
      <I.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{I.mandatory}} />
      </I.Label>
      <I.Input />
      <TpkValidationErrorsComponent
        @errors={{I.errors}}
        @classless={{@classless}}
      />
    </TpkValidationInputComponent>
  </template>
}
