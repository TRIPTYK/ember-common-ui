import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';

interface UiShowArgs {}

export default class UiShow extends Component<UiShowArgs> {
  @tracked value = '';
  @tracked selections: string[] = new TrackedArray([]);

  options = ['a', 'b', 'c'];
  @action
  setValue(value: any) {
    this.value = value;
  }

  @action
  setValueMultiple(value: any, alreadyInSelection: boolean) {
    console.log(value, alreadyInSelection);
    if (!alreadyInSelection) {
      this.selections.push(value);
    } else {
      this.selections = this.selections.filter((f) => f !== value);
    }

    console.log(this.selections);
  }

  @action
  search() {}
}
