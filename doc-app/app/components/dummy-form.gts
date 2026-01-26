import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, date, boolean, array, email } from 'zod';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';

export default class DummyFormComponent extends Component {
  @tracked changeset = new ImmerChangeset({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: null,
    languages: [],
    password: '',
    agreed: false,
    description: '',
  });

  validationSchema = object({
    firstName: string().min(2, 'At least 2 characters'),
    lastName: string().min(2, 'At least 2 characters'),
    email: email('Invalid email'),
    phone: string(),
    birthday: date().max(new Date(), 'Cannot be in the future'),
    languages: array(string()).min(1, 'Select at least one language'),
    password: string().min(8, 'At least 8 characters'),
    agreed: boolean().refine((value) => value === true, 'You must agree'),
    description: string().max(500, 'Maximum 500 characters'),
  });

  languageOptions = [
    {
      value: 'fr',
      label: 'French',
      toString: function () {
        return this.label;
      },
    },
    {
      value: 'en',
      label: 'English',
      toString: function () {
        return this.label;
      },
    },
    {
      value: 'es',
      label: 'Spanish',
      toString: function () {
        return this.label;
      },
    },
    {
      value: 'de',
      label: 'German',
      toString: function () {
        return this.label;
      },
    },
  ];

  @action
  onSubmit() {
    console.log('Form submitted with data:', this.changeset.data);
    alert('Form submitted successfully!');
  }

  @action
  onChange(value: unknown) {
    console.log('Value changed:', value);
  }

  <template>
    <div class="dummy-form-container">
      <h2>Dummy Form</h2>
      <TpkForm
        @changeset={{this.changeset}}
        @onSubmit={{this.onSubmit}}
        @reactive={{true}}
        @validationSchema={{this.validationSchema}}
        as |F|
      >
        <F.TpkInputPrefab @label="First Name" @validationField="firstName" />
        <F.TpkInputPrefab @label="Last Name" @validationField="lastName" />
        <F.TpkEmailPrefab @label="Email" @validationField="email" />
        <F.TpkMobilePrefab @label="Phone" @validationField="phone" />
        <F.TpkDatepickerPrefab @label="Birthday" @validationField="birthday" />
        <F.TpkSelectPrefab
          @label="Languages"
          @onChange={{this.onChange}}
          @validationField="languages"
          @multiple={{true}}
          @options={{this.languageOptions}}
        />
        <F.TpkPasswordPrefab @label="Password" @validationField="password" />
        <F.TpkTextareaPrefab
          @label="Description"
          @validationField="description"
        />
        <F.TpkCheckboxPrefab
          @label="I agree to the terms"
          @validationField="agreed"
        />
        <button type="submit">Submit</button>
      </TpkForm>
    </div>
  </template>
}
