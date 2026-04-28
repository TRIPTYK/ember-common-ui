import { type BaseValidationSignature } from '../base.ts';
import TpkValidationRadio, {
  type TpkValidationRadioSignature,
} from '../tpk-validation-radio.gts';
import type { TOC } from '@ember/component/template-only';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';

export interface TpkValidationRadioPrefabSignature extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] &
    TpkValidationRadioSignature['Args'] & {
      onChange?: (value: string) => void;
    };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const TpkValidationRadioPrefab: TOC<TpkValidationRadioPrefabSignature> =
  <template>
    <TpkValidationRadio
      @value={{@value}}
      @selected={{@selected}}
      @label={{@label}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @classless={{@classless}}
      @changeEvent={{@changeEvent}}
      @disabled={{@disabled}}
      @onChange={{@onChange}}
      @requiredFields={{@requiredFields}}
      as |V|
    >
      <div
        class='tpk-radio-container'
        data-test-tpk-prefab-radio-container={{@validationField}}
        {{! @glint-ignore }}
        anchorScrollUp={{@validationField}}
        ...attributes
      >
        <V.Label class='tpk-radio-label'>
          <span>{{@label}}</span>
          <V.Input class='tpk-radio-input' />
        </V.Label>
        <TpkValidationErrorsComponent
          class='tpk-validation-errors'
          @errors={{V.errors}}
        />
      </div>
    </TpkValidationRadio>
  </template>;

export default TpkValidationRadioPrefab;
