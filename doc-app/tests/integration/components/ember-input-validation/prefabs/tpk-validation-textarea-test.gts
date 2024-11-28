
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationTextarea from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-textarea';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { a11yAudit } from 'ember-a11y-testing/test-support';



module(
  'Integration | Component | Prefabs | tpk-validation-textarea',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent() {
      const changeset = new ImmerChangeset({
        name: 'Hellooo',
      });

      await render(
        <template>
          <TpkValidationTextarea @changeset={{changeset}} @validationField="name" @label="label" @mandatory={{true}} />
        </template>
      );

      return changeset;
    }

    test('renders checkbox with default structure and with mandatory', async function (assert) {
      await renderComponent();
      assert.dom('[data-test-tpk-label]').exists();
      assert.dom('[data-test-tpk-textarea-input]').exists();
      assert.dom('[data-test-tpk-label]').containsText('label *');
      assert.dom('[data-test-tpk-textarea-input]').hasValue('Hellooo');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      await renderComponent();
      assertTpkCssClassesExist(assert, 'textarea', 'textarea');
    });

    test('Accessibility', async function (assert) {
      assert.expect(0);
      await renderComponent();
      await a11yAudit();
    });
  },
);
