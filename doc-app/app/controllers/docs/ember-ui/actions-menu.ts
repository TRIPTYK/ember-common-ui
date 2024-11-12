import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DocsActionsMenuController extends Controller {
  @action
  showEditPopup() {
    window.alert('Edit');
  }
}
