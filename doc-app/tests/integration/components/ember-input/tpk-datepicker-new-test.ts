/* eslint-disable ember/no-pause-test */
/* eslint-disable qunit/require-expect */
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  findAll,
  fillIn,
  render,
  blur,
  click,
  waitFor,
  triggerKeyEvent,
} from '@ember/test-helpers';
import {
  setTempusDominusDate,
  openTempusDominus,
  closeTempusDominus,
} from '@triptyk/ember-input/test-support/datepicker-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tpk-datepicker', function (hooks) {
  setupRenderingTest(hooks);

  test('datepicker by default', async function (assert) {
    const date: Date = new Date(2022, 10, 12);
    this.set('setDate', function (dates: Date[]) {
      assert.step('step');
      assert.strictEqual(dates[0].toDateString(), date.toDateString());
    });

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="Default" as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    setTempusDominusDate('.tpk-datepicker-input-input', date);
    assert.dom('.tpk-datepicker-input-input').hasValue('12/11/2022');
    assert.verifySteps(['step']);
  });

  test('datepicker with default value', async function (assert) {
    const date: Date = new Date(2022, 10, 13);
    this.set('date', date);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="Default value" @value={{this.date}} as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    assert.dom('.tpk-datepicker-input-input').hasValue('13/11/2022');
  });

  test('datepicker is disabled', async function (assert) {
    const date: Date = new Date(2022, 10, 13);
    this.set('date', date);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @disabled={{true}} @label="Disabled" as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    assert.dom('.tpk-datepicker-input-input').hasAttribute('disabled');
  });

  test('datepicker use current date', async function (assert) {
    const date: Date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    await render(
      hbs`<TpkDatepicker @label="Current" @useCurrent={{true}} as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    // Open the datepicker in order to set current date default
    openTempusDominus('.tpk-datepicker-input-input');

    closeTempusDominus('.tpk-datepicker-input-input');
    assert.dom('.tpk-datepicker-input-input').hasValue(formattedDate);
  });

  test('datepicker range', async function (assert) {
    const date: Date = new Date(2022, 10, 13);
    const date2: Date = new Date(2022, 10, 16);
    this.set('date', date);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="Range" @range={{true}} @multipleDatesSeparator=" jusqu'au " as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    setTempusDominusDate('.tpk-datepicker-input-input', date, 0);
    setTempusDominusDate('.tpk-datepicker-input-input', date2, 1);

    assert
      .dom('.tpk-datepicker-input-input')
      .hasValue("13/11/2022 jusqu'au 16/11/2022");
  });

  test('datepicker range trigger changeEvent when select two dates', async function (assert) {
    const date: Date = new Date(2022, 10, 13);
    const date2: Date = new Date(2022, 10, 16);
    this.set('date', date);
    this.set('setDate', function (dates: Date[]) {
      assert.strictEqual(dates.length, 2);
    });

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="Range" @range={{true}} @multipleDatesSeparator=" jusqu'au " as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    setTempusDominusDate('.tpk-datepicker-input-input', date, 0);
    setTempusDominusDate('.tpk-datepicker-input-input', date2, 1);
  });

  // Currently not available
  // https://github.com/Eonasdan/tempus-dominus/issues/2830
  skip('datepicker range with default value', async function (assert) {
    const date: Date = new Date(2022, 10, 13);
    const date2: Date = new Date(2022, 10, 16);
    this.set('value', [date, date2]);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="Range" @multipleDatesSeparator=" jusqu'au " @range={{true}} @value={{this.value}} as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );

    assert
      .dom('.tpk-datepicker-input-input')
      .hasValue("13/11/2022 jusqu'au 16/11/2022");
  });

  test('datepicker with min and max date', async function (assert) {
    const date: Date = new Date(2022, 10, 15);
    const minDate: Date = new Date(2022, 10, 13);
    const maxDate: Date = new Date(2022, 10, 16);
    this.set('date', date);
    this.set('minDate', minDate);
    this.set('maxDate', maxDate);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @value={{this.date}} @label="Min/Max" @minDate={{this.minDate}} @maxDate={{this.maxDate}} as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    assert.dom('.day[data-day="12"]').hasClass('disabled');
    assert.dom('.day[data-day="17"]').hasClass('disabled');
    assert.dom('.day[data-day="15"]').hasNoClass('disabled');
  });

  test('show only timepicker', async function (assert) {
    const date: Date = new Date(2022, 10, 15, 8, 30);
    this.set('date', date);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @value={{this.date}} @enableTime={{true}} @label="Time" @enableCalendar={{false}} @format="HH:mm" as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    assert.dom('.date-container').doesNotExist();
  });

  test('datepicker prompt time on date select', async function (assert) {
    const date: Date = new Date(2022, 10, 15);
    this.set('date', date);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @value={{this.date}} @enableTime={{true}} @label="Prompt" @promptTimeOnDateChange={{true}} as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    await click('.day[data-day="17"]');
    await waitFor('.time-container.show');
    assert.dom('.time-container').hasClass('show');
  });

  test('datepicker viewMode show month', async function (assert) {
    const date: Date = new Date(2022, 10, 15);
    this.set('date', date);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @value={{this.date}} @label="View Mode" @viewMode="months" as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    assert.dom('.date-container-months').isVisible();
  });

  test('datepicker with a mask and a specific format', async function (assert) {
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="Mask/Format" @format="dd/MM-yyyy" @mask="d/m-Y" as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    await fillIn('.tpk-datepicker-input-input', '13/11-2022');
    assert.dom('.tpk-datepicker-input-input').hasValue('13/11-2022');
  });

  test('datepicker with time', async function (assert) {
    const date: Date = new Date(2022, 10, 15, 8, 30);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="Time format" @format="dd/MM/yyyy | HH:mm" @enableTime={{true}}  as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    setTempusDominusDate('.tpk-datepicker-input-input', date);
    assert.dom('.tpk-datepicker-input-input').hasValue('15/11/2022 | 08:30');
  });

  test('change locale for datepicker', async function (assert) {
    const date: Date = new Date(2022, 9, 15);
    this.set('date', date);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="Locale" @value={{this.date}} @locale="es" as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    assert.dom('.picker-switch').hasText('octubre de 22');
  });

  test('show today button', async function (assert) {
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="Show today" @todayButton={{true}} as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker>`,
    );
    openTempusDominus('.tpk-datepicker-input-input');
    assert.dom('.icon.icon-today').exists();
  });

  test('When press tab, datepicker is closed', async function (assert) {
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="Show today" @todayButton={{true}} as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepicker> <input type="text" id="input2" />`,
    );
    openTempusDominus('.tpk-datepicker-input-input');

    assert.dom('.tempus-dominus-widget').hasClass('show');
    await triggerKeyEvent('.tpk-datepicker-input-input', 'keydown', 'Tab');
    assert.dom('.tempus-dominus-widget').hasNoClass('show');
  });
});
