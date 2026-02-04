import { type TpkValidationInputComponentSignature } from '../tpk-validation-input';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
import type Owner from '@ember/owner';
export interface TpkValidationInputPrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkValidationInputComponentSignature['Args'];
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationInputPrefabComponent extends Component<TpkValidationInputPrefabSignature> {
    constructor(owner: Owner, args: TpkValidationInputPrefabSignature['Args']);
}
//# sourceMappingURL=tpk-validation-input.d.ts.map