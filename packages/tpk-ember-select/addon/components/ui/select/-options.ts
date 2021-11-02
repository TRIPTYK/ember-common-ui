import Component from '@glimmer/component';
import { SelectOption } from '../interfaces';

interface UiSelectOptionsArgs {
  setSelectedOption: SelectOption;
  options: SelectOption[];
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class UiSelectOptions extends Component<UiSelectOptionsArgs> {}
