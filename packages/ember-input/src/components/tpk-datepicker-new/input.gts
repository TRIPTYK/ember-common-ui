import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {
  DateTime,
  Namespace,
  TempusDominus,
  loadLocale,
  locale,
  extend,
} from '@eonasdan/tempus-dominus';
import { action } from '@ember/object';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

import {
  load,
  faFiveIcons,
  // @ts-expect-error
} from '@eonasdan/tempus-dominus/dist/plugins/fa-five';
extend(load);

export interface TpkDatepickerNewInputComponentSignature {
  Args: {
    guid: string;
    classless?: boolean;
    disabled?: boolean;
    disabledDates?: Date[] | ((date: Date) => boolean);
    value: Date[] | Date | string | string[] | null | number;
    onChange: (value: Date[], e: Event) => void;
  };
  Element: HTMLInputElement;
}

export default class TpkDatepickerNewInputComponent extends Component<TpkDatepickerNewInputComponentSignature> {
  @tracked declare datepicker: TempusDominus;

  @action
  setTempusDominus(element: HTMLDivElement) {
    this.datepicker = new TempusDominus(
      element.querySelector(`#${this.args.guid}`) as HTMLElement,
      {
        display: {
          icons: {
            date: 'icon icon-calendar',
            time: 'icon icon-time',
            up: 'icon icon-up',
            down: 'icon icon-down',
            next: 'icon icon-next',
            previous: 'icon icon-previous',
            today: 'icon icon-today',
            clear: 'icon icon-clear',
            close: 'icon icon-close',
          },
          buttons: {
            today: true,
            clear: true,
            close: true,
          },
          components: {
            calendar: true,
            date: true,
            month: true,
            year: true,
            decades: true,
            clock: true,
            hours: true,
            minutes: true,
            seconds: true,
          },
        },
      },
    );
  }
  <template>
    <div {{didInsert this.setTempusDominus}}>
      <input id={{@guid}} />
    </div>
  </template>
}
