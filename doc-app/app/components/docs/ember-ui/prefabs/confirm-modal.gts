import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TpkConfirmModalPrefab from '@triptyk/ember-ui/components/prefabs/tpk-confirm-modal-prefab';
import { action } from '@ember/object';
import TpkButtonPrefabComponent from '@triptyk/ember-input/components/prefabs/tpk-prefab-button';

export default class ConfirmModalExample extends Component {
  @tracked isOpen = false;
  confirmQuestion = 'Are you sure?';

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

  <template>
    <TpkButtonPrefabComponent @onClick={{this.open}} @label="Button Enabled" />
    <TpkConfirmModalPrefab
      @onClose={{this.onClose}}
      @onConfirm={{this.onConfirm}}
      @icon=""
      @cancelText="Annuler"
      @confirmText="Confirmer"
      @confirmQuestion={{this.confirmQuestion}}
      @isOpen={{this.isOpen}}
    />
  </template>
}
