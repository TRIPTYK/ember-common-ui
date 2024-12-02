import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

import { setupIntl } from 'ember-intl/test-support';
import { setTempusDominusDate } from '@triptyk/ember-input/test-support/datepicker-helpers';
import TpkValidationDatepicker from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';
import { a11yAudit } from 'ember-a11y-testing/test-support';


module(
  'Integration | Component | Prefabs | tpk-validation-datepicker',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(params?: {
      disabled?: boolean;
    }) {
      const immerChangeset = new ImmerChangeset({
        'datepicker': null,
      });
      await render(
        <template>
         <TpkValidationDatepicker
            @label="Datepicker"
            @disabled={{params.disabled}}
            @changeset={{immerChangeset}}
            @validationField="datepicker"
         />
        </template>,
      );
      return immerChangeset;
    }

    test('when change value in datepicker, changeset should be updated', async function (assert) {
      const date = new Date(2022, 10, 10);
      const changeset = await renderComponentAndReturnChangeset();
      setTempusDominusDate('.tpk-datepicker-input', date);
      assert.deepEqual(changeset.get('datepicker'), date);
    });

    test('It changes data-has-error attribute on error', async function (assert) {
     const changeset = await renderComponentAndReturnChangeset();
      await assertDataHasErrorAttribute(assert,changeset,'datepicker');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      await renderComponentAndReturnChangeset();

      assert.dom(`.tpk-datepicker-container`).exists().hasAttribute(`data-test-tpk-prefab-datepicker-container`);
      assert.dom(`.tpk-datepicker-container .tpk-datepicker-input`).exists()
      assert.dom(`.tpk-datepicker-container .tpk-validation-errors`).exists()
      assert.dom(`.tpk-datepicker-container .tpk-label`).exists()
      assert.dom('input').hasClass(`tpk-datepicker-input`);
      assert.dom(`label > div:first-of-type`).hasClass(`tpk-label`, `The first div inside label has the class tpk-label.`);
      assert.dom(`.tpk-datepicker-container > div:last-of-type`).hasClass(`tpk-validation-errors`, `The last div inside container has the class tpk-validation-errors.`);
    });

    test('@disabled disables the input', async function(assert) {
      await renderComponentAndReturnChangeset({
        disabled: true,
      });
      assert.dom(`[data-test-tpk-datepicker-input]`).hasAttribute('disabled');
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
