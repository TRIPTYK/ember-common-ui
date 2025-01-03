import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkConfirmModalPrefabController extends Controller {
  @tracked isOpen = false;
  confirmQuestion = 'Are you sure?';
  confirmText = 'Yes';
  cancelText = 'No';

  @action
  open() {
    this.isOpen = true;
  }

  @action
  onClose() {
    this.isOpen = false;
  }

  @action
  onConfirm() {
    this.isOpen = false;
    alert('Confirmed');
   }

}