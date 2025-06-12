import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import type { Promisable } from 'type-fest';
import { ImmerChangeset } from 'ember-immer-changeset';
import { Schema } from 'yup';
import type { WithBoundArgs } from '@glint/template';
import TpkValidationInputComponent from '../components/tpk-validation-input.gts';
import TpkValidationTextareaComponent from '../components/tpk-validation-textarea.gts';
import TpkValidationSelect from '../components/tpk-validation-select.gts';
import TpkValidationFileComponent from '../components/tpk-validation-file.gts';
import TpkValidationRadioComponent from '../components/tpk-validation-radio.gts';
import TpkValidationCheckboxComponent from '../components/tpk-validation-checkbox.gts';
import TpkValidationDatepickerComponent from '../components/tpk-validation-datepicker.gts';
import TpkFormService from '../services/tpk-form.ts';
import TpkValidationInputPrefabComponent from '../components/prefabs/tpk-validation-input.gts';
import type TpkValidationTextareaPrefabComponent from './prefabs/tpk-validation-textarea.gts';
import type TpkValidationSelectPrefabComponent from './prefabs/tpk-validation-select.gts';
import type TpkValidationSelectCreatePrefabComponent from './prefabs/tpk-validation-select-create.gts';
import type TpkValidationSelectSearchPrefabComponent from './prefabs/tpk-validation-select-search.gts';
import type TpkValidationCheckboxPrefabComponent from './prefabs/tpk-validation-checkbox.gts';
import type TpkValidationDatepickerPrefabComponent from './prefabs/tpk-validation-datepicker.gts';
import type TpkValidationDatepickerRangePrefabComponent from './prefabs/tpk-validation-datepicker-range.gts';
import type TpkValidationTimepickerPrefabComponent from './prefabs/tpk-validation-timepicker.gts';
import type TpkValidationPasswordPrefabComponent from './prefabs/tpk-validation-password.gts';
import type TpkValidationCurrencyPrefabComponent from './prefabs/tpk-validation-currency.gts';
import type TpkValidationIntegerComponent from '../components/prefabs/tpk-validation-integer.gts';
import type TpkValidationEmailPrefabComponent from './prefabs/tpk-validation-email.gts';
import type TpkValidationIBANPrefabComponent from './prefabs/tpk-validation-iban.gts';
import type TpkValidationMobilePrefabComponent from './prefabs/tpk-validation-mobile.gts';
import type TpkValidationNumberPrefabComponent from './prefabs/tpk-validation-number.gts';
import type TpkValidationBicPrefabComponent from './prefabs/tpk-validation-bic.gts';
import type TpkValidationNationalNumberPrefabComponent from './prefabs/tpk-validation-national-number.gts';
import type TpkValidationVATPrefabComponent from './prefabs/tpk-validation-vat.gts';
import type TpkValidationRadioGroupComponent from './tpk-validation-radio-group.gts';
import type TpkValidationRadioPrefabComponent from './prefabs/tpk-validation-radio.gts';
import type TpkValidationRadioGroupPrefabComponent from './prefabs/tpk-validation-radio-group.gts';
import type TpkValidationFilePrefabComponent from './prefabs/tpk-validation-file.gts';
interface ChangesetFormComponentArgs<T extends ImmerChangeset> {
    changeset: T;
    onSubmit: (changeset: T) => Promisable<unknown>;
    validationSchema: Schema;
    reactive?: boolean;
    removeErrorsOnSubmit?: boolean;
    autoScrollOnError?: boolean;
    disabled?: boolean;
    executeOnValid?: boolean;
}
export interface ChangesetFormComponentSignature<T extends ImmerChangeset> {
    Args: ChangesetFormComponentArgs<T>;
    Blocks: {
        default: [
            {
                TpkInput: WithBoundArgs<typeof TpkValidationInputComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkInputPrefab: WithBoundArgs<typeof TpkValidationInputPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkTextarea: WithBoundArgs<typeof TpkValidationTextareaComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkTextareaPrefab: WithBoundArgs<typeof TpkValidationTextareaPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkSelect: WithBoundArgs<typeof TpkValidationSelect, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkSelectPrefab: WithBoundArgs<typeof TpkValidationSelectPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkSelectCreatePrefab: WithBoundArgs<typeof TpkValidationSelectCreatePrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkSelectSearchPrefab: WithBoundArgs<typeof TpkValidationSelectSearchPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkCheckbox: WithBoundArgs<typeof TpkValidationCheckboxComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkCheckboxPrefab: WithBoundArgs<typeof TpkValidationCheckboxPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkRadio: WithBoundArgs<typeof TpkValidationRadioComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkRadioGroup: WithBoundArgs<typeof TpkValidationRadioGroupComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkRadioPrefab: WithBoundArgs<typeof TpkValidationRadioPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkRadioGroupPrefab: WithBoundArgs<typeof TpkValidationRadioGroupPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkFile: WithBoundArgs<typeof TpkValidationFileComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkDatepicker: WithBoundArgs<typeof TpkValidationDatepickerComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkDatepickerPrefab: WithBoundArgs<typeof TpkValidationDatepickerPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkDatepickerRangePrefab: WithBoundArgs<typeof TpkValidationDatepickerRangePrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkTimepickerPrefab: WithBoundArgs<typeof TpkValidationTimepickerPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkPasswordPrefab: WithBoundArgs<typeof TpkValidationPasswordPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkEmailPrefab: WithBoundArgs<typeof TpkValidationEmailPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkIbanPrefab: WithBoundArgs<typeof TpkValidationIBANPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkBicPrefab: WithBoundArgs<typeof TpkValidationBicPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkVatPrefab: WithBoundArgs<typeof TpkValidationVATPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkNationalNumberPrefab: WithBoundArgs<typeof TpkValidationNationalNumberPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkCurrencyPrefab: WithBoundArgs<typeof TpkValidationCurrencyPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkIntegerPrefab: WithBoundArgs<typeof TpkValidationIntegerComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkNumberPrefab: WithBoundArgs<typeof TpkValidationNumberPrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkMobilePrefab: WithBoundArgs<typeof TpkValidationMobilePrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                TpkFilePrefab: WithBoundArgs<typeof TpkValidationFilePrefabComponent, 'changeset' | 'disabled' | 'requiredFields'>;
                changesetGet: (path: string) => unknown;
                requiredFields: string[];
            }
        ];
    };
    Element: HTMLFormElement;
}
export default class ChangesetFormComponent<T extends ImmerChangeset> extends Component<ChangesetFormComponentSignature<T>> {
    requiredFields: string[];
    tpkForm: TpkFormService;
    constructor(owner: Owner, args: ChangesetFormComponentArgs<T>);
    validateAndSubmit: import("ember-concurrency").TaskForAsyncTaskFunction<this, () => Promise<void>>;
    submit: import("ember-concurrency").TaskForAsyncTaskFunction<this, (e: Event) => Promise<void>>;
    changesetGet: (path: string) => any;
    get errorsForScroll(): import("ember-immer-changeset").ValidationError[];
}
export {};
//# sourceMappingURL=tpk-form.d.ts.map