/* eslint-disable ember/no-pause-test */
/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, fillIn, render, blur } from '@ember/test-helpers';
import {
  setTempusDominusDate,
  openTempusDominus,
  closeTempusDominus,
} from '@triptyk/ember-input/test-support/datepicker-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tpk-datepicker-new', function (hooks) {
  setupRenderingTest(hooks);

  test('datepicker by default', async function (assert) {
    const date: Date = new Date(2022, 10, 12);
    this.set('setDate', function (dates: Date[]) {
      assert.step('step');
      assert.strictEqual(dates[0].toDateString(), date.toDateString());
    });

    await render(
      hbs`<TpkDatepickerNew @onChange={{this.setDate}} @label="Default" as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepickerNew>`,
    );
    setTempusDominusDate('.tpk-input-input', date);
    assert.dom('.tpk-input-input').hasValue('12/11/2022');
    assert.verifySteps(['step']);
  });

  test('datepicker with default value', async function (assert) {
    const date: Date = new Date(2022, 10, 13);
    this.set('date', date);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepickerNew @onChange={{this.setDate}} @label="Default value" @value={{this.date}} as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepickerNew>`,
    );
    assert.dom('.tpk-input-input').hasValue('13/11/2022');
  });

  test('datepicker is disabled', async function (assert) {
    const date: Date = new Date(2022, 10, 13);
    this.set('date', date);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepickerNew @disabled={{true}} @label="Disabled" as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepickerNew>`,
    );
    assert.dom('.tpk-input-input').hasAttribute('disabled');
  });

  test('datepicker use current date', async function (assert) {
    const date: Date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    await render(
      hbs`<TpkDatepickerNew @label="Current" @useCurrent={{true}} as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepickerNew>`,
    );
    // Open the datepicker in order to set current date default
    openTempusDominus('.tpk-input-input');

    closeTempusDominus('.tpk-input-input');
    assert.dom('.tpk-input-input').hasValue(formattedDate);
  });

  test('datepicker range', async function (assert) {
    const date: Date = new Date(2022, 10, 13);
    const date2: Date = new Date(2022, 10, 16);
    this.set('date', date);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepickerNew @onChange={{this.setDate}} @label="Range" @range={{true}} @multipleDatesSeparator=" jusqu'au " as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepickerNew>`,
    );
    setTempusDominusDate('.tpk-input-input', date, 0);
    setTempusDominusDate('.tpk-input-input', date2, 1);

    assert.dom('.tpk-input-input').hasValue("13/11/2022 jusqu'au 16/11/2022");
  });
  test('datepicker range with default value', async function (assert) {
    const date: Date = new Date(2022, 10, 13);
    const date2: Date = new Date(2022, 10, 16);
    this.set('value', [date, date2]);
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepickerNew @onChange={{this.setDate}} @label="Range" @range={{true}} @multipleDatesSeparator=" jusqu'au " @value={{this.value}} as |D|>
            <D.Label />
            <D.Input />
          </TpkDatepickerNew>`,
    );
    await this.pauseTest();

    assert.dom('.tpk-input-input').hasValue("13/11/2022 jusqu'au 16/11/2022");
  });
});
