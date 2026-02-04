import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import { on } from '@ember/modifier';

export default class TpkFormDisabledStateExample extends Component {
  @tracked isLoading = false;

  changeset = new ImmerChangeset({
    name: '',
  });

  validationSchema = object({
    name: string().min(2, 'Name must be at least 2 characters'),
  });

  @action
  handleSubmit(validatedData: { name: string }) {
    this.isLoading = true;
    setTimeout(() => {
      console.log('Form submitted with:', validatedData);
      alert('Form submitted successfully!');
      this.isLoading = false;
    }, 1000);
  }

  @action
  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  <template>
    <div class="space-y-4">
      <button class="button" type="button" {{on "click" this.toggleLoading}}>
        {{if this.isLoading "Enable Form" "Disable Form"}}
      </button>

      <TpkForm
        @changeset={{this.changeset}}
        @validationSchema={{this.validationSchema}}
        @onSubmit={{this.handleSubmit}}
        @disabled={{this.isLoading}}
        as |F|
      >
        <F.TpkInputPrefab @label="Name" @validationField="name" />
        <button class="button" type="submit">Submit</button>
      </TpkForm>
    </div>
  </template>
}
