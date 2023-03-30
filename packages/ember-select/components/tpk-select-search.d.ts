import TpkSelect, { moveOperations, SelectActions, TpkSelectArgs } from './tpk-select';
export interface TpkSelectSearchArgs extends TpkSelectArgs<unknown> {
    onInput: (value: string) => unknown;
}
export default class TpkSelectSearch extends TpkSelect<TpkSelectSearchArgs> {
    protected keyToOpenSelectAction: {
        [key: string]: SelectActions;
    };
    onInput(e: Event): void;
    protected navigate(action: keyof typeof moveOperations | SelectActions.First | SelectActions.Last): void;
}
