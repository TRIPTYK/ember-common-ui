import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { type TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import {
  setTempusDominusDate,
  openTempusDominus,
} from '@triptyk/ember-input/test-support/datepicker-helpers';

module(
  'Integration | Component | Prefabs | tpk-validation-timepicker',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(this: TestContext) {
      const immerChangeset = new ImmerChangeset({
        time: undefined,
      });
      this.set('changeset', immerChangeset);

      await render(
        hbs`
         <Prefabs::TpkValidationTimepicker
            @label="Time"
            @changeset={{this.changeset}}
            @validationField="time"
            class="tpk-input"
         />
        `,
      );
      return immerChangeset;
    }

    test('when change value in timepicker, changeset should be update', async function (assert) {
      const date = new Date(2022, 10, 10, 12, 30);
      const changeset = await renderComponentAndReturnChangeset.call(this);
      setTempusDominusDate('.tpk-datepicker-input-input', date);
      assert.deepEqual(changeset.get('time'), date);
    });

    test('Should show time container and cannot get the calendar', async function (assert) {
      await renderComponentAndReturnChangeset.call(this);
      openTempusDominus('.tpk-datepicker-input-input');
      assert.dom('.time-container').exists();
      assert.dom('.calendar-container').doesNotExist();
      assert.dom('.icon.icon-calendar').doesNotExist();
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'time',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });
  },
);
