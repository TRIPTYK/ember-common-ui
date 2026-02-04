import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import type { PartialDeep, Promisable } from 'type-fest';
import { ImmerChangeset } from 'ember-immer-changeset';
import type * as z from 'zod';
import { ZodObject } from 'zod';
import type { WithBoundArgs } from '@glint/template';
import TpkValidationInputComponent from '../components/tpk-validation-input';
import TpkValidationTextareaComponent from '../components/tpk-validation-textarea';
import TpkValidationSelect from '../components/tpk-validation-select';
import TpkValidationFileComponent from '../components/tpk-validation-file';
import TpkValidationRadioComponent from '../components/tpk-validation-radio';
import TpkValidationCheckboxComponent from '../components/tpk-validation-checkbox';
import TpkValidationDatepickerComponent from '../components/tpk-validation-datepicker';
import TpkFormService from '../services/tpk-form.ts';
import TpkValidationInputPrefabComponent from '../components/prefabs/tpk-validation-input';
import type TpkValidationTextareaPrefabComponent from './prefabs/tpk-validation-textarea';
import type TpkValidationSelectPrefabComponent from './prefabs/tpk-validation-select';
import type TpkValidationSelectCreatePrefabComponent from './prefabs/tpk-validation-select-create';
import type TpkValidationSelectSearchPrefabComponent from './prefabs/tpk-validation-select-search';
import type TpkValidationCheckboxPrefabComponent from './prefabs/tpk-validation-checkbox';
import type TpkValidationDatepickerPrefabComponent from './prefabs/tpk-validation-datepicker';
import type TpkValidationDatepickerRangePrefabComponent from './prefabs/tpk-validation-datepicker-range';
import type TpkValidationTimepickerPrefabComponent from './prefabs/tpk-validation-timepicker';
import type TpkValidationPasswordPrefabComponent from './prefabs/tpk-validation-password';
import type TpkValidationCurrencyPrefabComponent from './prefabs/tpk-validation-currency';
import type TpkValidationIntegerComponent from '../components/prefabs/tpk-validation-integer';
import type TpkValidationEmailPrefabComponent from './prefabs/tpk-validation-email';
import type TpkValidationIBANPrefabComponent from './prefabs/tpk-validation-iban';
import type TpkValidationMobilePrefabComponent from './prefabs/tpk-validation-mobile';
import type TpkValidationNumberPrefabComponent from './prefabs/tpk-validation-number';
import type TpkValidationBicPrefabComponent from './prefabs/tpk-validation-bic';
import type TpkValidationNationalNumberPrefabComponent from './prefabs/tpk-validation-national-number';
import type TpkValidationVATPrefabComponent from './prefabs/tpk-validation-vat';
import type TpkValidationRadioGroupComponent from './tpk-validation-radio-group';
import type TpkValidationRadioPrefabComponent from './prefabs/tpk-validation-radio';
import type TpkValidationRadioGroupPrefabComponent from './prefabs/tpk-validation-radio-group';
import type TpkValidationFilePrefabComponent from './prefabs/tpk-validation-file';
type DeepNullable<T> = {
    [K in keyof T]: DeepNullable<T[K]> | null;
};
type DeepNothing<T> = DeepNullable<PartialDeep<T>>;
interface ChangesetFormComponentArgs<S extends ZodObject, T extends ImmerChangeset<DeepNothing<z.infer<S>>>> {
    changeset: T;
    onSubmit: (data: z.infer<S>, changeset: ImmerChangeset<z.infer<S>>) => Promisable<unknown>;
    validationSchema: S;
    reactive?: boolean;
    removeErrorsOnSubmit?: boolean;
    autoScrollOnError?: boolean;
    disabled?: boolean;
    executeOnValid?: boolean;
}
export interface ChangesetFormComponentSignature<S extends ZodObject, T extends ImmerChangeset<DeepNothing<z.infer<S>>>> {
    Args: ChangesetFormComponentArgs<S, T>;
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
export default class ChangesetFormComponent<S extends ZodObject, T extends ImmerChangeset<DeepNothing<z.infer<S>>>> extends Component<ChangesetFormComponentSignature<S, T>> {
    requiredFields: string[];
    tpkForm: TpkFormService;
    constructor(owner: Owner, args: ChangesetFormComponentArgs<S, T>);
    validateAndSubmit: import("ember-concurrency").TaskForAsyncTaskFunction<this, () => Promise<void>>;
    submit: import("ember-concurrency").TaskForAsyncTaskFunction<this, (e: Event) => Promise<void>>;
    changesetGet: (path: string) => unknown;
    get errorsForScroll(): import("ember-immer-changeset").ValidationError[];
}
export {};
//# sourceMappingURL=tpk-form.d.ts.map