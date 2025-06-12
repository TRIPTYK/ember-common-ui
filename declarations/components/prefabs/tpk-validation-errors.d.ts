import Component from '@glimmer/component';
import { type IntlService } from 'ember-intl';
export interface TpkValidationErrorsComponentSignature {
    Args: {
        errors: any;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationErrorsComponent extends Component<TpkValidationErrorsComponentSignature> {
    intl: IntlService;
    htmlSafe: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [string];
            Named: object;
        };
        Return: import("@ember/template").SafeString;
    }>;
    get errorMessages(): any;
}
//# sourceMappingURL=tpk-validation-errors.d.ts.map