import Component from '@glimmer/component';

interface TpkSelectContainerArgs<T = unknown> {
  options: T[];
  selected: T;
}

export default class TpkSelectContainer extends Component<TpkSelectContainerArgs> {}
