import { _ as _defineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import TpkDatepickerNewInputComponent from './tpk-datepicker-input.js';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkDatepicker;
class TpkDatepicker extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "guid", guidFor(this));
  }
}
_TpkDatepicker = TpkDatepicker;
setComponentTemplate(precompileTemplate("\n    {{yield (hash Input=(component TpkDatepickerNewInputComponent guid=this.guid disabled=@disabled value=@value placeholder=@placeholder useCurrent=@useCurrent mode=@mode multipleDatesSeparator=@multipleDatesSeparator stepping=@stepping promptTimeOnDateChange=@promptTimeOnDateChange todayButton=@todayButton clearButton=@clearButton closeButton=@closeButton enableTime=@enableTime noCalendar=@noCalendar enableSecond=@enableSecond keepOpen=@keepOpen locale=@locale dateFormat=@dateFormat minDate=@minDate maxDate=@maxDate daysOfWeekDisabled=@daysOfWeekDisabled disabledTimeIntervals=@disabledTimeIntervals disabledDates=@disabledDates enabledDates=@enabledDates disabledHours=@disabledHours enabledHours=@enabledHours viewMode=@viewMode onChange=@onChange onClose=@onClose) Label=(component TpkLabel guid=this.guid label=@label) guid=this.guid)}}\n  ", {
  strictMode: true,
  scope: () => ({
    hash,
    TpkDatepickerNewInputComponent,
    TpkLabel
  })
}), _TpkDatepicker);

export { TpkDatepicker as default };
//# sourceMappingURL=tpk-datepicker.js.map
