import Component from '@glimmer/component';
import { action } from '@ember/object';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';

export default class TpkFormBaseComponentsExample extends Component {
  changeset = new ImmerChangeset({
    username: '',
  });

  validationSchema = object({
    username: string().min(3, 'Username must be at least 3 characters'),
  });

  @action
  handleSubmit(validatedData: { username: string }) {
    console.log('Form submitted with:', validatedData);
    alert('Form submitted successfully!');
  }

  errorMessage(error: Record<string, unknown>): string {
    const message = error['message'];
    return typeof message === 'string' ? message : '';
  }

  <template>
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      as |F|
    >
      <F.TpkInput @label="Username" @validationField="username" as |I|>
        <I.Label />
        <I.Input />
        {{#if I.errors}}
          <div class="error-messages">
            {{#each I.errors as |error|}}
              <p class="error">{{this.errorMessage error}}</p>
            {{/each}}
          </div>
        {{/if}}
      </F.TpkInput>

      <button class="button" type="submit">Submit</button>
    </TpkForm>
  </template>
}
