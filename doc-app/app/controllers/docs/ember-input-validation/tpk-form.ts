import Controller from '@ember/controller';
import ImmerChangeset from 'ember-immer-changeset';
import { object, string, array, date, boolean, number } from 'yup';
import { action } from '@ember/object';

// BEGIN-SNIPPET tpk-form-controller.js
export default class TpkFormController extends Controller {
  changeset = new ImmerChangeset({
    firstName: '',
    lastName: '',
    languages: ['French', 'English'],
    birthday: null,
    email: '',
    phone: '',
    nationalNumber: '',
    vat: '',
    bic: '',
    iban: '',
    status: '',
    isFree: false,
    time: null,
    availableMoney: 0,
  });
  options = ['French', 'English', 'Spanish', 'German', 'Italian'];
  validationSchema = object().shape({
    firstName: string().required().min(3),
    lastName: string().required().min(3),
    languages: array().min(2),
    birthday: date().required(),
    email: string().email().required(),
    phone: string().required(),
    nationalNumber: string().optional(),
    vat: string().optional(),
    bic: string().optional(),
    iban: string().optional(),
    status: string().optional(),
    isFree: boolean().required(),
    time: date().required(),
    password: string().required(),
    availableMoney: number().required(),
  });

  @action
  success() {
    alert('success');
  }
}
// END-SNIPPET
