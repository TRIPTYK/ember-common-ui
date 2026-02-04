import Component from '@glimmer/component';
import { action } from '@ember/object';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';

export default class TpkFormChangesetGetExample extends Component {
  changeset = new ImmerChangeset({
    firstName: '',
    lastName: '',
  });

  validationSchema = object({
    firstName: string().min(2, 'First name must be at least 2 characters'),
    lastName: string().min(2, 'Last name must be at least 2 characters'),
  });

  @action
  handleSubmit(validatedData: { firstName: string; lastName: string }) {
    console.log('Form submitted with:', validatedData);
    alert('Form submitted successfully!');
  }

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      as |F|
    >
      <F.TpkInputPrefab @label="First Name" @validationField="firstName" />
      <F.TpkInputPrefab @label="Last Name" @validationField="lastName" />

      <p class="mt-3 text-sm text-gray-600">
        Full name:
        {{String (F.changesetGet "firstName")}}
        {{String (F.changesetGet "lastName")}}
      </p>

      <button class="button" type="submit">Submit</button>
    </TpkForm>
  </template>
}
