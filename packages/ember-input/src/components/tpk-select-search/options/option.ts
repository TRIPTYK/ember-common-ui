import TpkSelectContainerOptionsOption, {
  TpkSelectContainerOptionsOptionArgs,
} from '../../tpk-select/options/option';

export interface TpkSelectSearchContainerOptionsOptionArgs
  extends TpkSelectContainerOptionsOptionArgs {}

export default class TpkSelectSearchContainerOptionsOption extends TpkSelectContainerOptionsOption {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-select-search/options/option': typeof TpkSelectSearchContainerOptionsOption;
  }
}
