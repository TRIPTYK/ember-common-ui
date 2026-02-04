import Component from '@glimmer/component';
import { action } from '@ember/object';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';

export default class TpkFormErrorHandlingExample extends Component {
  changeset = new ImmerChangeset({
    field1: '',
    field2: '',
  });

  validationSchema = object({
    field1: string().min(3, 'Field 1 must be at least 3 characters'),
    field2: string().min(3, 'Field 2 must be at least 3 characters'),
  });

  @action
  handleSubmit(validatedData: { field1: string; field2: string }) {
    console.log('Form submitted with:', validatedData);
    alert('Form submitted successfully!');
  }

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      @removeErrorsOnSubmit={{true}}
      @autoScrollOnError={{true}}
      as |F|
    >
      <F.TpkInputPrefab @label="Field 1" @validationField="field1" />
      <F.TpkInputPrefab @label="Field 2" @validationField="field2" />
      <button class="button" type="submit">Submit</button>
    </TpkForm>
  </template>
}
