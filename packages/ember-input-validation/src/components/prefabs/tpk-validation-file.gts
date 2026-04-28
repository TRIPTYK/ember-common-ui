import { type BaseValidationSignature } from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from './mandatory-label.gts';
import { type TOC } from '@ember/component/template-only';
import TpkValidationFile, {
  type TpkValidationFileSignature,
} from '../tpk-validation-file.gts';

export interface TpkValidationFilePrefabSignature extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] &
    TpkValidationFileSignature['Args'] & { mandatory?: boolean };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const TpkValidationFilePrefab: TOC<TpkValidationFilePrefabSignature> =
  <template>
    <TpkValidationFile
      @label={{@label}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @mandatory={{@mandatory}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @requiredFields={{@requiredFields}}
      as |V|
    >
      <V.Label
        class='tpk-file-container'
        data-has-error='{{V.hasError}}'
        {{! @glint-ignore }}
        anchorScrollUp={{@validationField}}
        data-test-tpk-prefab-file-container={{@validationField}}
        ...attributes
      >
        <MandatoryLabelComponent @label={{@label}} class='tpk-label' />
        <V.Input class='tpk-file-input' data-test-tpk-file-input />
        <TpkValidationErrorsComponent
          class='tpk-validation-errors'
          @errors={{V.errors}}
        />
      </V.Label>
    </TpkValidationFile>
  </template>;

export default TpkValidationFilePrefab;
