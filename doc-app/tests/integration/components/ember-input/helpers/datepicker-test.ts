import { module, test } from 'qunit';
import {
  clearTempusDominusDate,
  setTempusDominusDate,
  openTempusDominus,
  closeTempusDominus,
  isTempusDominusOpen,
} from '@triptyk/ember-input/test-support/datepicker-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { TestContext } from '@ember/test-helpers';

module('Integration | Helpers | Datepicker', function (hooks) {
  setupRenderingTest(hooks);

  const selector = '.tpk-datepicker-input-input';

  function renderDatepicker(this: TestContext) {
    const date: Date = new Date(2022, 10, 12);
    this.set('date', date);
    this.set('setDate', function () {});

    return render(
      hbs`<TpkDatepicker @onChange={{this.setDate}} @value={{this.date}} @label="Testouille" as |D|>
              <D.Label />
              <D.Input />
            </TpkDatepicker>`,
    );
  }

  test('clear tempus dominus helper works', async function (assert) {
    await renderDatepicker.call(this);
    assert.dom(selector).hasValue('12/11/2022');
    clearTempusDominusDate(selector);
    assert.dom(selector).hasValue('');
  });

  test('set tempus dominus date helper works', async function (assert) {
    await renderDatepicker.call(this);
    const newDate: Date = new Date(2022, 10, 15);
    assert.dom(selector).hasValue('12/11/2022');
    setTempusDominusDate(selector, newDate);
    assert.dom(selector).hasValue('15/11/2022');
  });

  test('open tempus dominus date picker helper works', async function (assert) {
    await renderDatepicker.call(this);
    assert.dom('.tempus-dominus-widget').doesNotExist();
    openTempusDominus(selector);
    assert.dom('.tempus-dominus-widget').hasClass('show');
  });

  test('close tempus dominus date picker helper works', async function (assert) {
    await renderDatepicker.call(this);
    assert.dom('.tempus-dominus-widget').doesNotExist();
    openTempusDominus(selector);
    assert.dom('.tempus-dominus-widget').exists();
    assert.dom('.tempus-dominus-widget').hasClass('show');
    closeTempusDominus(selector);
    assert.dom('.tempus-dominus-widget').hasNoClass('show');
  });

  test('isOpen tempus dominus date picker helper works', async function (assert) {
    await renderDatepicker.call(this);
    openTempusDominus(selector);

    assert.true(isTempusDominusOpen());
  });

  test('throw error when tempus dominus date picker not exist', async function (assert) {
    await renderDatepicker.call(this);
    try {
      openTempusDominus('.not-exist');
    } catch {
      assert.step('noInput');
    }

    assert.verifySteps(['noInput']);
  });
});
