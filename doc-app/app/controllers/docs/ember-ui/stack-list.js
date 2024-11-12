import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsStackListController extends Controller {
  @tracked data = [];
  titleForAdd = 'add element to list';
  contentData = 'element added';

  @action
  onAddData() {
    const newData = [...this.data, this.contentData];
    this.data = newData;
  }

  @action
  onRemoveData(index) {
    const newData = [...this.data];
    newData.splice(index, 1);
    this.data = newData;
  }
}
