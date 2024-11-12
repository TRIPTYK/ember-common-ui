import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkFileController extends Controller {
  @tracked value?: File;

  @action
  onChange(value: File) {
    this.value = value;
  }
}
