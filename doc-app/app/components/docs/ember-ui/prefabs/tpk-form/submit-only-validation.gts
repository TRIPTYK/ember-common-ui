import Component from '@glimmer/component';
import { action } from '@ember/object';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';

export default class TpkFormSubmitOnlyValidationExample extends Component {
  changeset = new ImmerChangeset({
    email: '',
  });

  validationSchema = object({
    email: string().email('Must be a valid email address'),
  });

  @action
  handleSubmit(validatedData: { email: string }) {
    console.log('Form submitted with:', validatedData);
    alert('Form submitted successfully!');
  }

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      @reactive={{false}}
      as |F|
    >
      <F.TpkEmailPrefab @label="Email" @validationField="email" />
      <button class="button" type="submit">Submit</button>
    </TpkForm>
  </template>
}
