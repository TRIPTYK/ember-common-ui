/* eslint-disable ember/no-pause-test */
/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
// @ts-expect-error
import { setFlatpickrDate } from 'ember-flatpickr/test-support/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tpk-datepicker', function (hooks) {
  setupRenderingTest(hooks);

  test('class/less by default', async function (assert) {
    this.set('classless', false);
    this.set('setDate', function () {});
    await render(
      hbs`<TpkDatepicker @classless={{this.classless}} @label="label" @value="value" @onChange={{this.setDate}} as |D|>
        <D.Input />
        <D.Label />
      </TpkDatepicker>`,
    );

    assert.dom('.tpk-datepicker-label').exists().containsText('label');
    assert.dom('.tpk-datepicker-input').exists().hasValue('');
    assert.dom('.tpk-datepicker').exists();

    this.set('classless', true);

    findAll('*').filter((e) => e.id !== "modal-overlays").forEach((e) => {
      assert.dom(e).hasNoClass(/tpk-.*/);
    });
  });

  test('datepicker by default', async function (assert) {
    const date: Date = new Date();
    this.set('setDate', function (dates: Date[]) {
      assert.step('step');
      assert.strictEqual(dates[0]?.toDateString(), date.toDateString());
    });

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="label" @value="" as |D|>
      <D.Input />
      <D.Label />
</TpkDatepicker>`,
    );
    await setFlatpickrDate('[data-test-tpk-datepicker-content]', date);
    assert
      .dom('[data-test-tpk-datepicker-content]')
      .hasAttribute('id', { any: true });
    assert
      .dom('[data-test-tpk-datepicker-label]')
      .hasAttribute('for', { any: true });
    assert.verifySteps(['step']);
  });

  test('Accessibility', async function (assert) {
    this.set('setDate', function () {});

    await render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @label="label" @value=""/>`,
    );
    await a11yAudit();
    assert.expect(0);
  });
});
