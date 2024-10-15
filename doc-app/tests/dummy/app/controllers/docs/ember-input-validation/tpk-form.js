import Controller from '@ember/controller';
import ImmerChangeset from 'ember-immer-changeset';
import { object, string, array } from 'yup';
import { action } from '@ember/object';

// BEGIN-SNIPPET tpk-form-controller.js
export default class TpkFormController extends Controller {
  changeset = new ImmerChangeset({
    firstName: '',
    lastName: '',
    languages: [],
  });
  options = ['French', 'English', 'Spanish', 'German', 'Italian'];

  validationSchema = object().shape({
    firstName: string().required().min(3),
    lastName: string().required().min(3),
    languages: array().min(2),
  });

  @action
  success() {
    alert('success');
  }
}
// END-SNIPPET
