import { action } from '@ember/object';
import Component from '@glimmer/component';

interface TpkDatepickerInputArgs {}

export default class TpkDatepickerInput extends Component<TpkDatepickerInputArgs> {
  @action
  onReady(_selectedDates: any, _dateStr: any, instance: any) {
    instance.input.after(instance.calendarContainer);
    instance.config.static = true;
  }
}
