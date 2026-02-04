import Component from '@glimmer/component';
import { action } from '@ember/object';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';

export default class TpkFormRequiredFieldsExample extends Component {
  changeset = new ImmerChangeset({
    name: '',
    email: '',
  });

  validationSchema = object({
    name: string().min(2, 'Name must be at least 2 characters'),
    email: string().email('Must be a valid email address'),
  });

  @action
  handleSubmit(validatedData: { name: string; email: string }) {
    console.log('Form submitted with:', validatedData);
    alert('Form submitted successfully!');
  }

  includes = (array: string[], value: string) => array.includes(value);

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      as |F|
    >
      <p class="mb-3 text-sm text-gray-600">Required fields:
        {{F.requiredFields.length}}</p>

      <F.TpkInputPrefab @label="Name" @validationField="name" />

      {{#if (this.includes F.requiredFields "email")}}
        <p class="mb-2 text-sm text-blue-600">Email is required</p>
      {{/if}}
      <F.TpkEmailPrefab @label="Email" @validationField="email" />

      <button class="button" type="submit">Submit</button>
    </TpkForm>
  </template>
}
