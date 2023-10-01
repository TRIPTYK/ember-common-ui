import TpkSelectOptionsComponent from '../tpk-select/options';

export default class TpkSelectSearchOptionsComponent extends TpkSelectOptionsComponent {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-select-search/options': typeof TpkSelectSearchOptionsComponent;
  }
}
