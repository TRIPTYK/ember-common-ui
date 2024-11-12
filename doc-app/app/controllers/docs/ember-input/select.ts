import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkSelectController extends Controller {
  @tracked selection = '';
  @tracked valueCar: string[] = [];
  @tracked multiple = true;
  @tracked sauceOptions = ['BBQ', 'Ketchup', 'Dallas'];
  @tracked carOptions = ['BMW', 'Mercedes', 'Audi', 'Tesla'];

  @action
  onChange(value: string) {
    this.selection = value;
  }

  @action
  onChangeCar(car: string) {
    if (this.valueCar.includes(car)) {
      this.valueCar = this.valueCar.filter(
        (existingCar) => existingCar !== car,
      );
    } else {
      this.valueCar = [...this.valueCar, car];
    }
  }
}
