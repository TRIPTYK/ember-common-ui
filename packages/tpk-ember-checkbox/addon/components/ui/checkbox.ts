import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiCheckboxArgs {
  // eslint-disable-next-line no-unused-vars
  onChange: (e: Event) => unknown;
}

export default class UiCheckbox extends Component<UiCheckboxArgs> {
  guid = guidFor(this);
}
