import TpkValidationInputComponent, {
  type TpkValidationInputComponentSignature,
} from '../tpk-validation-input.gts';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';

export interface TpkValidationEmailComponentSignature
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

export default class TpkValidationEmailComponent extends BaseValidationComponent<TpkValidationEmailComponentSignature> {
  <template>
    <TpkValidationInputComponent
      @type='email'
      @label={{@label}}
      @classless={{@classless}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      data-has-error='{{this.hasError}}'
      ...attributes
      data-test-input='email'

      as |V|
    >
      <V.Label
        class={{unless @classless 'tpk-input-validation-label'}}
        data-test-label-not-yielded
      >
        {{@label}}
        {{#if @mandatory}}
          <span class='mandatory'>
            *
          </span>
        {{/if}}
      </V.Label>
      <V.Input />
      <TpkValidationErrorsComponent
        @errors={{V.errors}}
        @classless={{@classless}}
      />

    </TpkValidationInputComponent>
  </template>
}
