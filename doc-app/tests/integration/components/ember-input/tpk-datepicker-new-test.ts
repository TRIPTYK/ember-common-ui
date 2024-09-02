/* eslint-disable ember/no-pause-test */
/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, fillIn, render, blur } from '@ember/test-helpers';
// @ts-expect-error
import { setFlatpickrDate } from 'ember-flatpickr/test-support/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tpk-datepicker-new', function (hooks) {
  setupRenderingTest(hooks);

  test('datepicker by default', async function (assert) {
    const date: Date = new Date();
    this.set('setDate', function (dates: Date[]) {
      assert.step('step');
      assert.strictEqual(dates[0]?.toDateString(), date.toDateString());
    });

    await render(
      hbs`<TpkDatepickerNew @onChange={{this.setDate}} @label="label" @value="" as |D|>
            <D.Input />
            <D.Label />
          </TpkDatepickerNew>`,
    );

    await this.pauseTest();
  });
});
