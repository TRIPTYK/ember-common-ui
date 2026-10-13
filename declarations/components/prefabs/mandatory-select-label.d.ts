import Component from '@glimmer/component';
import type { PowerSelectLabelSignature } from 'ember-power-select/components/power-select/label';
export interface MandatorySelectLabelSignature {
    Args: PowerSelectLabelSignature['Args'] & {
        mandatory?: boolean;
    };
    Element: HTMLLabelElement;
}
export default class MandatorySelectLabel extends Component<MandatorySelectLabelSignature> {
    onLabelClick(e: MouseEvent): void;
}
//# sourceMappingURL=mandatory-select-label.d.ts.map