import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TempusDominus, Namespace } from '@eonasdan/tempus-dominus';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import IMask from 'imask';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TpkDatepickerNewInputComponent;
let TpkDatepickerNewInputComponent = (_class = (_TpkDatepickerNewInputComponent = class TpkDatepickerNewInputComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "datepicker", _descriptor, this);
  }
  get value() {
    return this.args.value === null ? undefined : this.args.value;
  }
  setMask(element) {
    if (!this.args.mask) return;
    IMask(element, {
      mask: this.args.mask,
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 9999
        },
        H: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 23,
          maxLength: 2
        },
        M: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2
        },
        S: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2
        }
      },
      lazy: true,
      overwrite: true,
      autofix: true
    });
  }
  setTempusDominus(element) {
    this.datepicker = new TempusDominus(element, {
      container: element.parentElement,
      defaultDate: this.value,
      useCurrent: this.args.useCurrent === true ? true : false,
      allowInputToggle: false,
      dateRange: this.args.mode === 'range' ? true : false,
      multipleDates: this.args.mode === 'multiple' ? true : false,
      multipleDatesSeparator: this.args.multipleDatesSeparator,
      promptTimeOnDateChange: this.args.promptTimeOnDateChange,
      stepping: this.args.stepping ?? 5,
      display: {
        viewMode: this.args.viewMode,
        keepOpen: this.args.keepOpen === true ? true : false,
        icons: {
          date: 'icon icon-calendar',
          time: 'icon icon-time',
          up: 'icon icon-up',
          down: 'icon icon-down',
          next: 'icon icon-next',
          previous: 'icon icon-previous',
          today: 'icon icon-today',
          clear: 'icon icon-clear',
          close: 'icon icon-close'
        },
        buttons: {
          today: this.args.todayButton,
          clear: this.args.clearButton === false ? false : true,
          close: this.args.closeButton === false ? false : true
        },
        components: {
          calendar: this.args.noCalendar === true ? false : true,
          date: this.args.noCalendar === true ? false : true,
          month: this.args.noCalendar === true ? false : true,
          year: this.args.noCalendar === true ? false : true,
          decades: this.args.noCalendar === true ? false : true,
          clock: this.args.enableTime,
          hours: this.args.enableTime,
          minutes: this.args.enableTime,
          seconds: this.args.enableSecond
        }
      },
      localization: {
        locale: this.args.locale ?? 'fr',
        format: this.args.dateFormat ?? 'dd/MM/yyyy'
      },
      restrictions: {
        minDate: this.args.minDate,
        maxDate: this.args.maxDate,
        daysOfWeekDisabled: this.args.daysOfWeekDisabled,
        disabledTimeIntervals: this.args.disabledTimeIntervals ?? [],
        disabledDates: this.args.disabledDates ?? [],
        enabledDates: this.args.enabledDates ?? [],
        disabledHours: this.args.disabledHours ?? [],
        enabledHours: this.args.enabledHours ?? []
      }
    });
    // Set the datepicker instance on the input element in order to use it in testing
    // @ts-expect-error _tempusDominus is not a standard property
    element._tempusDominus = this.datepicker;
    if (this.args.onChange) {
      this.datepicker.subscribe(Namespace.events.change, () => {
        if (this.args.onChange) {
          if (this.args.mode === 'multiple' || this.args.mode === 'range') {
            // Workaround to trigger change event after at least 2 dates are picked
            if (this.datepicker.dates.picked.length > 1) {
              return this.args.onChange(this.datepicker.dates.picked);
            }
            return;
          }
          this.args.onChange(this.datepicker.dates.picked);
        }
      });
    }
    if (this.args.onClose) {
      this.datepicker.subscribe(Namespace.events.hide, () => {
        this.args.onClose?.();
      });
    }
  }
  closeDatepicker(event) {
    if (event.key === 'Escape') {
      this.datepicker?.hide();
    }
    if (event.key === 'Tab') {
      this.datepicker?.hide();
    }
  }
}, setComponentTemplate(precompileTemplate("\n    <div class=\"tpk-datepicker-input-input-container\">\n      <input {{didInsert this.setTempusDominus}} {{didInsert this.setMask}} disabled={{@disabled}} class=\"tpk-datepicker-input-input\" placeholder={{@placeholder}} id={{@guid}} aria-autocomplete=\"none\" autocomplete=\"off\" autofill=\"off\" {{on \"keydown\" this.closeDatepicker}} data-test-tpk-datepicker-content ...attributes />\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    didInsert,
    on
  })
}), _TpkDatepickerNewInputComponent), _TpkDatepickerNewInputComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "datepicker", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "setMask", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setMask"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setTempusDominus", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setTempusDominus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "closeDatepicker", [action], Object.getOwnPropertyDescriptor(_class.prototype, "closeDatepicker"), _class.prototype), _class);

export { TpkDatepickerNewInputComponent as default };
//# sourceMappingURL=tpk-datepicker-input.js.map
