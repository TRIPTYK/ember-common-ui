import Component from '@glimmer/component';
import { action } from '@ember/object';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';

export default class TpkFormExample extends Component {
  // Initialize an empty changeset
  changeset = new ImmerChangeset({
    firstName: '',
    lastName: '',
    email: '',
  });

  // Define validation rules with Zod
  validationSchema = object({
    firstName: string().min(2, 'First name must be at least 2 characters'),
    lastName: string().min(2, 'Last name must be at least 2 characters'),
    email: string().email('Must be a valid email address'),
  });

  @action
  handleSubmit(
    validatedData: {
      firstName: string;
      lastName: string;
      email: string;
    },
    changeset: ImmerChangeset<{
      firstName: string;
      lastName: string;
      email: string;
    }>
  ) {
    // validatedData contains the validated form data
    // changeset is the ImmerChangeset instance
    console.log('Form submitted with:', validatedData, changeset);
    alert('Form submitted successfully!');
  }

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @onSubmit={{this.handleSubmit}}
      @validationSchema={{this.validationSchema}}
      as |F|
    >
      <F.TpkInputPrefab @label="First Name" @validationField="firstName" />

      <F.TpkInputPrefab @label="Last Name" @validationField="lastName" />

      <F.TpkEmailPrefab @label="Email" @validationField="email" />

      <button class="button" type="submit">Submit</button>
    </TpkForm>
  </template>
}
