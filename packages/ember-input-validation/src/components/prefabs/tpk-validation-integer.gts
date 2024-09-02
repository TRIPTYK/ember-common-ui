import TpkValidationInputComponent, {
  type TpkValidationInputComponentSignature,
} from '../tpk-validation-input.gts';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';

export interface TpkValidationIntegerComponentSignature
  extends BaseValidationSignature {
  Args: Omit<
    TpkValidationInputComponentSignature['Args'],
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

export default class TpkValidationIntegerComponent extends BaseValidationComponent<TpkValidationIntegerComponentSignature> {
  <template>
    <TpkValidationInputComponent
      @type='number'
      @label={{@label}}
      @min={{0}}
      @step={{1}}
      @classless={{@classless}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @mandatory={{@mandatory}}
      ...attributes
      data-test-input='integer'
      as |I|
    >
      <I.Label />
      <I.Input />
      <TpkValidationErrorsComponent
        @errors={{I.errors}}
        @classless={{@classless}}
      />
    </TpkValidationInputComponent>
  </template>
}
