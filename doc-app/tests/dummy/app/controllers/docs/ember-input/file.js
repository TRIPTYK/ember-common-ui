import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DocsTpkFileController extends Controller {
  @action
  onChange(value) {
    this.value = value;
  }
}
