import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTableGenericController extends Controller {
  @action
  rowClick() {
    alert('row click');
  }

  @tracked pageSizes = [10, 25, 50, 100];
  @tracked pageSize = 10;

  @action
  deleteAction() {
    alert('delete click');
  }
}
