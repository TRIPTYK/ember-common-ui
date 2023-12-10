import Controller from '@ember/controller';
import ImmerChangeset from 'ember-immer-changeset';
import { object, string } from 'yup';
import { action } from '@ember/object';

// BEGIN-SNIPPET tpk-form-controller.js
export default class TpkFormController extends Controller {
  changeset = new ImmerChangeset({});

  validationSchema = object().shape({
    firstName: string().required().min(3),
  });

  @action
  success() {
    alert('success');
  }
}
// END-SNIPPET
