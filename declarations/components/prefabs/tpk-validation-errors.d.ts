import Component from '@glimmer/component';
import { type IntlService } from 'ember-intl';
export interface TpkValidationErrorsSignature {
    Args: {
        errors: any;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationErrors extends Component<TpkValidationErrorsSignature> {
    intl: IntlService;
    htmlSafe: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [string];
            Named: object;
        };
        Return: import("@ember/template").TrustedHTML;
    }>;
    get errorMessages(): any;
}
//# sourceMappingURL=tpk-validation-errors.d.ts.map