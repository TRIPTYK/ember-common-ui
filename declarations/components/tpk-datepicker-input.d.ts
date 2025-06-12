import Component from '@glimmer/component';
import { TempusDominus } from '@eonasdan/tempus-dominus';
export interface TpkDatepickerInputArgs {
    mask?: string;
    maskOptions?: Record<string, unknown>;
    unmaskValue?: boolean;
    disabled?: boolean;
    placeholder?: string;
    value: Date | string | null;
    stepping?: number;
    mode?: 'multiple' | 'range';
    multipleDatesSeparator?: string;
    useCurrent?: boolean;
    promptTimeOnDateChange?: boolean;
    todayButton?: boolean;
    clearButton?: boolean;
    closeButton?: boolean;
    enableTime?: boolean;
    noCalendar?: boolean;
    enableSecond?: boolean;
    keepOpen?: boolean;
    locale?: string;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;
    daysOfWeekDisabled?: number[];
    disabledTimeIntervals?: {
        from: Date;
        to: Date;
    }[];
    disabledDates?: Date[];
    enabledDates?: Date[];
    disabledHours?: number[];
    enabledHours?: number[];
    viewMode?: 'clock' | 'calendar' | 'months' | 'years' | 'decades';
    onChange?: (value: Date[]) => void;
    onClose?: () => void;
}
export interface TpkDatepickerInputComponentSignature {
    Args: TpkDatepickerInputArgs & {
        guid: string;
    };
    Element: HTMLInputElement;
}
export interface HTMLInputTDElement extends HTMLInputElement {
    _tempusDominus: TempusDominus;
}
export default class TpkDatepickerNewInputComponent extends Component<TpkDatepickerInputComponentSignature> {
    datepicker?: TempusDominus;
    get value(): string | Date | undefined;
    setMask(element: HTMLElement): void;
    setTempusDominus(element: HTMLInputElement): void;
    closeDatepicker(event: KeyboardEvent): void;
}
//# sourceMappingURL=tpk-datepicker-input.d.ts.map