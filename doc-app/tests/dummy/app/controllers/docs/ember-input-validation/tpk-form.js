import Controller from '@ember/controller';
import ImmerChangeset from 'ember-immer-changeset';
import { object, string } from 'yup';
import { action } from '@ember/object';

// BEGIN-SNIPPET tpk-form-controller.js
export default class TpkFormController extends Controller {
<<<<<<< Updated upstream
  changeset = new ImmerChangeset({});
=======
  changeset = new ImmerChangeset({
    firstName: '',
    lastName: '',
    languages: ['French', 'English'],
  });
  options = ['French', 'English', 'Spanish', 'German', 'Italian'];
>>>>>>> Stashed changes

  validationSchema = object().shape({
    firstName: string().required().min(3),
  });

  @action
  success() {
    alert('success');
  }
}
// END-SNIPPET
