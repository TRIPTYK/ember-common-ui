import Component from '@glimmer/component';
import { type Changeset } from 'ember-immer-changeset';
export interface BaseValidationSignature {
    Args: {
        changeset: Changeset;
        validationField: string;
        mandatory?: boolean;
        requiredFields?: string[];
    };
    Blocks: {
        default: unknown[];
    };
}
export declare abstract class BaseValidationComponent<T extends BaseValidationSignature> extends Component<T> {
    constructor(owner: unknown, args: T['Args']);
    get hasError(): boolean;
    get firstError(): Record<string, unknown> | undefined;
    get mandatory(): boolean;
    get errors(): Record<string, unknown>[];
    get value(): unknown;
}
//# sourceMappingURL=base.d.ts.map