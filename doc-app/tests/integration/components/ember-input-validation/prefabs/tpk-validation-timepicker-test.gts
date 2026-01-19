import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

import { setupIntl } from 'ember-intl/test-support';
import {
  setTempusDominusDate,
  openTempusDominus,
} from '@triptyk/ember-input/test-support/datepicker-helpers';
import TpkValidationTimepicker from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-timepicker';
import { a11yAudit } from 'ember-a11y-testing/test-support';



module(
  'Integration | Component | Prefabs | tpk-validation-timepicker',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(params?: {
      disabled?: boolean;
    }) {
      const immerChangeset = new ImmerChangeset({
        time: null,
      });

      await render(
        <template>
         <TpkValidationTimepicker
            @label="Time"
            @changeset={{immerChangeset}}
            @validationField="time"
            @disabled={{params.disabled}}
            class="tpk-input"
         />
        </template>,
      );
      return immerChangeset;
    }

    test('when change value in timepicker, changeset should be update', async function (assert) {
      const date = new Date(2022, 10, 10, 12, 30);
      const changeset = await renderComponentAndReturnChangeset();
      setTempusDominusDate('.tpk-timepicker-input', date);
      assert.deepEqual(changeset.get('time'), date);
    });

    test('Should show time container and cannot get the calendar', async function (assert) {
      await renderComponentAndReturnChangeset();
      openTempusDominus('.tpk-timepicker-input');
      assert.dom('.time-container').exists();
      assert.dom('.calendar-container').doesNotExist();
      assert.dom('.icon.icon-calendar').doesNotExist();
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset();
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

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      await renderComponentAndReturnChangeset();

      assert.dom(`.tpk-timepicker-container`).exists().hasAttribute(`data-test-tpk-prefab-timepicker-container`);
      assert.dom(`.tpk-timepicker-container .tpk-timepicker-input`).exists()
      assert.dom(`.tpk-timepicker-container .tpk-validation-errors`).exists()
      assert.dom(`.tpk-timepicker-container .tpk-label`).exists()
      assert.dom('input').hasClass(`tpk-timepicker-input`);
      assert.dom(`label > div:first-of-type`).hasClass(`tpk-label`, `The first div inside label has the class tpk-label.`);
      assert.dom(`.tpk-timepicker-container > div:last-of-type`).hasClass(`tpk-validation-errors`, `The last div inside container has the class tpk-validation-errors.`);
    });

    test('@disabled disables the input', async function(assert) {
      await renderComponentAndReturnChangeset({
        disabled: true,
      });
      assert.dom(`[data-test-tpk-timepicker-input]`).hasAttribute('disabled');
    });

    test('Accessibility', async function (assert) {
      assert.expect(0);
      await renderComponentAndReturnChangeset({
        disabled: false,
      });
      await a11yAudit();
    });
  },
);
